"use client";
import { useRouter } from "next/navigation";

import { logout } from "@/services/auth.service";

import { useAuthStore } from "@/store/auth.store";

export default function DashboardPage() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await logout();

    clearAuth();

    router.push("/login");
  };

  return (
    <div className="p-8">
      <h1 className="mb-4 text-3xl font-bold">Welcome, {user?.name}</h1>

      <button onClick={handleLogout} className="rounded bg-red-600 px-4 py-2 text-white">
        Logout
      </button>
    </div>
  );
}
