'use client';
import { createContext, useContext, useReducer, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    default:
      return state;
  }
};

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: true, // Initially loading to check localStorage
  error: null
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [storedToken, setStoredToken, tokenLoading] = useLocalStorage('auth_token', null);
  const [storedUser, setStoredUser, userLoading] = useLocalStorage('user_data', null);

  const isStorageLoading = tokenLoading || userLoading;

  useEffect(() => {
    // Wait for localStorage to load
    if (isStorageLoading) return;

    // Check localStorage for existing auth data
    if (storedToken && storedUser) {
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          token: storedToken,
          user: storedUser
        }
      });
    } else {
      // No stored auth data, set loading to false
      dispatch({ type: 'LOGIN_FAILURE', payload: null });
    }
  }, [storedToken, storedUser, isStorageLoading]);

  // Listen for storage changes (for cross-tab sync)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'auth_token' || e.key === 'user_data') {
        window.location.reload();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = async (credentials) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // For demo purposes, accept any credentials
      if (credentials.user && credentials.token) {
        // Store in localStorage
        setStoredToken(credentials.token);
        setStoredUser(credentials.user);
        
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: credentials
        });

        return { success: true };
      }
      
      // If no direct credentials, simulate API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      
      // Store in localStorage
      setStoredToken(data.token);
      setStoredUser(data.user);
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: data
      });

      return { success: true };
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.message
      });
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    // Clear localStorage
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('auth_token');
      window.localStorage.removeItem('user_data');
    }
    setStoredToken(null);
    setStoredUser(null);
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (userData) => {
    const updatedUser = { ...state.user, ...userData };
    setStoredUser(updatedUser);
    dispatch({
      type: 'UPDATE_USER',
      payload: userData
    });
  };

  const value = {
    ...state,
    loading: state.loading || isStorageLoading,
    login,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}