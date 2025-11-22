'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import LoginScreen from './login-screen';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        router.refresh();
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-subtle-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return <LoginScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 font-montserrat">
      <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/admin" className="flex items-center gap-3">
            <img
              src="/logo/ark-transpa.png"
              alt="Ark Institute logo"
              className="h-8 w-auto"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-xs uppercase tracking-wide text-gray-400">
                Admin
              </span>
              <span className="font-bold text-lg text-primary">
                Ark Institute
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{session.user.email}</span>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md border border-red-200 text-red-700 bg-red-50 hover:bg-red-100 hover:border-red-300 transition-colors"
            >
              <LogOut className="w-3 h-3 mr-1" />
              Sign out
            </button>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto p-6">
        {children}
      </main>
    </div>
  );
}
