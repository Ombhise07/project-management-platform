"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { logout } from "@/services/auth.service";

import { useAuthStore } from "@/store/auth.store";
import { getCurrentUser } from "@/services/auth.service";

export default function DashboardPage() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.logout);
  const testRefresh = async () => {
    const response = await getCurrentUser();

    console.log(response.data);
  };

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  const handleLogout = async () => {
    await logout();

    clearAuth();

    router.push("/login");
  };

  if (!user) return null;

  return (
    <div className="p-8">
      <h1 className="mb-4 text-3xl font-bold">Welcome, {user?.name}</h1>

      <button onClick={handleLogout} className="rounded bg-red-600 px-4 py-2 text-white">
        Logout
      </button>

      <button onClick={testRefresh} className="rounded bg-blue-600 px-4 py-2 text-white">
        Test API
      </button>
    </div>
  );
}
