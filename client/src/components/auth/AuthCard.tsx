import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function AuthCard({ children }: Props) {
  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
      {children}
    </div>
  );
}
