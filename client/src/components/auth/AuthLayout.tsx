import { ReactNode } from "react";

import AuthBranding from "./AuthBranding";

type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <main className="flex min-h-screen bg-slate-50">
      <AuthBranding />

      <section className="flex flex-1 items-center justify-center p-6 lg:p-10">{children}</section>
    </main>
  );
}
