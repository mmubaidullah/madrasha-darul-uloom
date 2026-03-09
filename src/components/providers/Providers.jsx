'use client';
import { Toaster } from 'react-hot-toast';
import SessionProvider from '@/components/SessionProvider';

export default function Providers({ children }) {
  return (
    <SessionProvider>
      {children}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: '#4aed88',
            },
          },
        }}
      />
    </SessionProvider>
  );
}