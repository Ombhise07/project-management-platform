"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { LogOut, Menu, X } from "lucide-react";
import { toast } from "sonner";

import { logout } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

import { Button } from "@/components/ui";

export default function Navbar() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.logout);

  const [loading, setLoading] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);

      await logout();

      clearAuth();

      toast.success("Logged out successfully");

      router.replace("/login");
    } catch {
      toast.error("Failed to logout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div>
          <h1
            className="cursor-pointer text-xl font-bold text-slate-900"
            onClick={() => router.push("/workspaces")}
          >
            Project Manager
          </h1>
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <span className="text-sm text-slate-600">
            Welcome, <span className="font-semibold">{user?.name}</span>
          </span>

          <Button variant="destructive" onClick={handleLogout} loading={loading}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="space-y-4 border-t border-slate-200 bg-white px-6 py-4 md:hidden">
          <p className="text-sm font-medium text-slate-700">{user?.name}</p>

          <Button variant="destructive" fullWidth onClick={handleLogout} loading={loading}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      )}
    </header>
  );
}
