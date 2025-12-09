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
  refreshProfile: () => Promise<void>;
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

  const loadUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') { // No se encontró el perfil
          console.log('Profile not found for user:', userId);
          setProfile(null);
        } else {
          console.error('Error loading profile:', error);
          setProfile(null);
        }
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      setProfile(null);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await loadUserProfile(user.id);
    }
  };

  useEffect(() => {
    // Obtener sesión inicial
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Initial session:', session);
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await loadUserProfile(session.user.id);
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    // Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await loadUserProfile(session.user.id);
        } else {
          setProfile(null);
        }
        
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

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
      isEditor,
      refreshProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};