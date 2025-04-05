import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';

type AuthError = {
  message: string;
  code?: string;
};

type AuthContextType = {
  session: Session | null;
  loading: boolean;
  error: AuthError | null;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetError: () => void;
};

const defaultContext: AuthContextType = {
  session: null,
  loading: true,
  error: null,
  signInWithEmail: async () => {},
  signUpWithEmail: async () => {},
  signOut: async () => {},
  resetError: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultContext);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);

  const resetError = () => setError(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        if (session) {
          const {
            data: { user },
            error: refreshError,
          } = await supabase.auth.refreshSession();
          if (refreshError) throw refreshError;
          if (user) setSession(session);
        }
      } catch (error: any) {
        setError({
          message: error.message || 'Failed to restore session',
          code: error.code,
        });
        console.error('Error fetching session:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    try {
      resetError();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (error: any) {
      const authError = {
        message: error.message || 'Failed to sign in',
        code: error.code,
      };
      setError(authError);
      console.error('Error signing in:', error);
      throw authError;
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      resetError();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: 'com.giftmate.app://auth-callback',
        },
      });
      if (error) throw error;
    } catch (error: any) {
      const authError = {
        message: error.message || 'Failed to sign up',
        code: error.code,
      };
      setError(authError);
      console.error('Error signing up:', error);
      throw authError;
    }
  };

  const signOut = async () => {
    try {
      resetError();
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setSession(null);
    } catch (error: any) {
      const authError = {
        message: error.message || 'Failed to sign out',
        code: error.code,
      };
      setError(authError);
      console.error('Error signing out:', error);
      throw authError;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        error,
        signInWithEmail,
        signUpWithEmail,
        signOut,
        resetError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
