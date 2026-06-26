"use client";

import { Navbar } from "@/components/layouts/workspace";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl p-8">{children}</main>
    </>
  );
}
