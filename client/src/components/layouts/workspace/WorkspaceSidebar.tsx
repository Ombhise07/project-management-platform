"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LayoutDashboard, FolderKanban } from "lucide-react";

interface Props {
  workspaceId: string;
}

export default function WorkspaceSidebar({ workspaceId }: Props) {
  const pathname = usePathname();

  const links = [
    {
      label: "Dashboard",
      href: `/workspaces/${workspaceId}`,
      icon: LayoutDashboard,
    },
    {
      label: "Projects",
      href: `/workspaces/${workspaceId}/projects`,
      icon: FolderKanban,
    },
  ];

  return (
    <aside className="w-72 border-r border-slate-200 bg-white">
      <nav className="flex flex-col gap-2 p-5">
        {links.map((link) => {
          const Icon = link.icon;

          const active =
            link.label === "Dashboard"
              ? pathname === link.href
              : pathname === link.href || pathname.startsWith(`${link.href}/`);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                active ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon size={20} />

              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
