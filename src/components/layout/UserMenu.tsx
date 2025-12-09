"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User, LogOut, Settings, Shield, Edit, Eye, 
  ChevronDown, BadgeCheck, Users 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export function UserMenu() {
  const { user, profile, signOut, isSuperAdmin, isModerator, isEditor } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  if (!user || !profile) return null;

  const getRoleIcon = () => {
    if (isSuperAdmin()) return <Shield className="h-4 w-4 text-yellow-500" />;
    if (isModerator()) return <Eye className="h-4 w-4 text-blue-500" />;
    if (isEditor()) return <Edit className="h-4 w-4 text-green-500" />;
    return <User className="h-4 w-4 text-primary" />;
  };

  const getRoleBadge = () => {
    if (isSuperAdmin()) return (
      <span className="bg-yellow-500/20 text-yellow-500 text-xs px-2 py-1 rounded uppercase font-bold">
        SUPERADMIN
      </span>
    );
    if (isModerator()) return (
      <span className="bg-blue-500/20 text-blue-500 text-xs px-2 py-1 rounded uppercase font-bold">
        MODERADOR
      </span>
    );
    if (isEditor()) return (
      <span className="bg-green-500/20 text-green-500 text-xs px-2 py-1 rounded uppercase font-bold">
        EDITOR
      </span>
    );
    return (
      <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded uppercase font-bold">
        USUARIO
      </span>
    );
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const handleDashboard = () => {
    router.push('/dashboard');
  };

  const handleUserManagement = () => {
    router.push('/dashboard/users');
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-border/30 bg-black/30 hover:bg-black/50 rounded-none group"
        >
          <div className="flex items-center gap-2">
            <div className="relative">
              {profile.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.username || user.email || ''}
                  className="h-8 w-8 rounded-full border border-primary/30"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                  <User className="h-4 w-4 text-primary" />
                </div>
              )}
              <div className="absolute -bottom-1 -right-1">
                {getRoleIcon()}
              </div>
            </div>
            
            <div className="hidden md:flex flex-col items-start">
              <span className="text-sm font-bold text-primary">
                {profile.username || user.email?.split('@')[0]}
              </span>
              <span className="text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>
            
            <ChevronDown className={cn(
              "h-4 w-4 text-primary/50 transition-transform",
              isOpen && "rotate-180"
            )} />
          </div>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-64 bg-gradient-to-b from-black to-black/95 border border-border/50 rounded-none shadow-2xl"
        align="end"
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.username || user.email || ''}
                    className="h-10 w-10 rounded-full border border-primary/30"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                )}
                <div>
                  <p className="font-bold text-primary">{profile.username}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              {getRoleBadge()}
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-primary/5 rounded border border-primary/10">
                <p className="text-muted-foreground">ROL</p>
                <p className="font-bold text-primary uppercase">{profile.role}</p>
              </div>
              <div className="p-2 bg-primary/5 rounded border border-primary/10">
                <p className="text-muted-foreground">ID</p>
                <p className="font-mono text-xs truncate" title={user.id}>
                  {user.id.substring(0, 8)}...
                </p>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="bg-border/50" />
        
        <DropdownMenuItem 
          onClick={handleDashboard}
          className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10"
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>Panel de Control</span>
        </DropdownMenuItem>
        
        {isSuperAdmin() && (
          <DropdownMenuItem 
            onClick={handleUserManagement}
            className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10"
          >
            <Users className="mr-2 h-4 w-4" />
            <span>Gestión de Usuarios</span>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuSeparator className="bg-border/50" />
        
        <DropdownMenuItem 
          onClick={handleSignOut}
          className="cursor-pointer hover:bg-destructive/10 focus:bg-destructive/10 text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar Sesión</span>
        </DropdownMenuItem>
        
        <div className="p-3 border-t border-border/30">
          <p className="text-xs text-center text-muted-foreground">
            Sistema Táctico v1.0
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}