import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from './mongodb';
import { UserMongoDB } from './mongodb-db';
import bcrypt from 'bcryptjs';

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    // Credentials Provider for Email/Password login
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('ইমেইল এবং পাসওয়ার্ড আবশ্যক');
          }

          const userDB = new UserMongoDB();
          const user = await userDB.findByEmail(credentials.email);

          if (!user) {
            throw new Error('এই ইমেইল দিয়ে কোনো অ্যাকাউন্ট পাওয়া যায়নি');
          }

          // Check if account is locked
          if (await userDB.isAccountLocked(user)) {
            throw new Error('অ্যাকাউন্ট লক হয়ে আছে। ৩০ মিনিট পর আবার চেষ্টা করুন।');
          }

          // Verify password
          const isPasswordValid = await userDB.verifyPassword(
            credentials.password, 
            user.password
          );

          if (!isPasswordValid) {
            // Increment login attempts
            await userDB.incrementLoginAttempts(user._id);
            throw new Error('ভুল পাসওয়ার্ড');
          }

          // Check if user is active
          if (user.status !== 'active') {
            throw new Error('আপনার অ্যাকাউন্ট নিষ্ক্রিয় করা হয়েছে');
          }

          // Update last login and reset login attempts
          await userDB.updateLastLogin(user._id);

          // Return user object for session
          return {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
            phone: user.phone,
            status: user.status,
            emailVerified: user.emailVerified
          };
        } catch (error) {
          console.error('Authentication error:', error);
          throw new Error(error.message);
        }
      }
    }),

    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),

    // Facebook OAuth Provider
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    })
  ],

  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },

  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (user) {
        token.role = user.role;
        token.phone = user.phone;
        token.status = user.status;
        token.userId = user.id;
      }

      // Handle OAuth sign in
      if (account && (account.provider === 'google' || account.provider === 'facebook')) {
        try {
          const userDB = new UserMongoDB();
          let existingUser = await userDB.findByEmail(token.email);

          if (!existingUser) {
            // Create new user for OAuth login with default role
            existingUser = await userDB.createUser({
              name: token.name,
              email: token.email,
              password: 'oauth-user', // OAuth users don't have password
              phone: '', // Will be updated in profile
              role: 'parent', // Default role for OAuth users
              emailVerified: true, // OAuth emails are pre-verified
              status: 'active'
            });
          }

          token.role = existingUser.role;
          token.phone = existingUser.phone;
          token.status = existingUser.status;
          token.userId = existingUser._id;
        } catch (error) {
          console.error('OAuth user creation error:', error);
        }
      }

      return token;
    },

    async session({ session, token }) {
      // Send properties to the client
      if (token) {
        session.user.id = token.userId;
        session.user.role = token.role;
        session.user.phone = token.phone;
        session.user.status = token.status;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      // Handle role-based redirects after login
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  },

  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login', // Error code passed in query string as ?error=
  },

  events: {
    async signIn({ user, account, profile }) {
      console.log('User signed in:', { 
        email: user.email, 
        provider: account?.provider,
        role: user.role 
      });
    },
    async signOut({ session }) {
      console.log('User signed out:', session?.user?.email);
    }
  },

  debug: process.env.NODE_ENV === 'development',
};

// Helper function to get role-based redirect URL
export function getRoleBasedRedirectUrl(role) {
  const roleRedirects = {
    super_admin: '/dashboard/admin',
    admin: '/dashboard/admin',
    teacher: '/dashboard/teacher',
    student: '/dashboard/student',
    parent: '/dashboard/parent'
  };

  return roleRedirects[role] || '/dashboard';
}

// Helper function to check if user has required role
export function hasRequiredRole(userRole, requiredRoles) {
  if (!Array.isArray(requiredRoles)) {
    requiredRoles = [requiredRoles];
  }
  return requiredRoles.includes(userRole);
}

// Role hierarchy for access control
export const ROLE_HIERARCHY = {
  super_admin: 4,
  admin: 3,
  teacher: 2,
  student: 1,
  parent: 1
};

// Check if user has sufficient role level
export function hasMinimumRole(userRole, minimumRole) {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[minimumRole];
}