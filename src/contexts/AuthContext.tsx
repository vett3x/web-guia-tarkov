"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile, UserRole } from '@/integrations/supabase/types';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  hasRole: (requiredRole: UserRole) => boolean;
  isSuperAdmin: () => boolean;
  isModerator: () => boolean;
  isEditor: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('AuthContext - Initializing auth state...');
    }

    // Obtener sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('AuthContext - Initial session:', session ? 'Exists' : 'None');
        console.log('AuthContext - User ID:', session?.user?.id);
      }
      
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        loadUserProfile(session.user.id, session.user.email!);
      } else {
        setIsLoading(false);
      }
    }).catch(error => {
      console.error('AuthContext - Error getting initial session:', error);
      setIsLoading(false);
    });

    // Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('AuthContext - Auth state changed:', event);
          console.log('AuthContext - New session:', session ? 'Exists' : 'None');
        }
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await loadUserProfile(session.user.id, session.user.email!);
        } else {
          setProfile(null);
          setIsLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (userId: string, userEmail: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('AuthContext - Loading profile for user:', userId);
    }
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') { // No se encontró el perfil
          if (process.env.NODE_ENV === 'development') {
            console.log('AuthContext - Profile not found, will create one in dashboard');
          }
          // No creamos el perfil aquí, lo dejamos para el dashboard
          setProfile(null);
        } else {
          console.error('AuthContext - Error loading profile:', error);
          setProfile(null);
        }
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.log('AuthContext - Profile loaded:', data);
        }
        setProfile(data);
      }
    } catch (error) {
      console.error('AuthContext - Error loading profile:', error);
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const hasRole = (requiredRole: UserRole): boolean => {
    if (!profile) return false;
    
    // Definir jerarquía de roles
    const roleHierarchy: Record<UserRole, number> = {
      superadmin: 4,
      moderator: 3,
      editor: 2,
      user: 1
    };

    const userRoleLevel = roleHierarchy[profile.role];
    const requiredRoleLevel = roleHierarchy[requiredRole];
    
    return userRoleLevel >= requiredRoleLevel;
  };

  const isSuperAdmin = () => hasRole('superadmin');
  const isModerator = () => hasRole('moderator');
  const isEditor = () => hasRole('editor');

  return (
    <AuthContext.Provider value={{
      session,
      user,
      profile,
      isLoading,
      signOut,
      hasRole,
      isSuperAdmin,
      isModerator,
      isEditor
    }}>
      {children}
    </AuthContext.Provider>
  );
};