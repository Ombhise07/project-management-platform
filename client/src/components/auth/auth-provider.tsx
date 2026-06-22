"use client";

import { useEffect, useState } from "react";

import { refresh, getCurrentUser } from "@/services/auth.service";

import { useAuthStore } from "@/store/auth.store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  const setUser = useAuthStore((state) => state.setUser);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const refreshResponse = await refresh();

        const accessToken = refreshResponse.data.accessToken;

        setAccessToken(accessToken);

        const userResponse = await getCurrentUser();

        setUser(userResponse.data);
      } catch {
        setUser(null);
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [setAccessToken, setUser]);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  return children;
}
