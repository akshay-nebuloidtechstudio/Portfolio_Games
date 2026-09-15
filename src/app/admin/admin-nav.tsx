"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface User {
  id: string;
  fullName: string;
  email: string;
  username: string;
  role: string;
}

export function AdminNav({
  user,
  pendingCount,
}: {
  user: User;
  pendingCount: number;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
      router.refresh();
    } catch {
      setLoggingOut(false);
    }
  }

  const links = [
    { href: "/admin/dashboard", label: "Dashboard" },
    {
      href: "/admin/access-requests",
      label: "Access Requests",
      badge: pendingCount > 0 ? pendingCount : null,
    },
    { href: "/admin/users", label: "Users" },
    { href: "/admin/games", label: "Games" },
  ];

  return (
    <nav className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link
            href="/admin/dashboard"
            className="text-lg font-semibold text-zinc-900 dark:text-zinc-100"
          >
            Nebuloid Admin
          </Link>
          <div className="hidden gap-1 sm:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                }`}
              >
                {link.label}
                {link.badge !== null && (
                  <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-zinc-500 dark:text-zinc-400 sm:inline">
            {user.username}
          </span>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 disabled:opacity-50 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
      <div className="border-t border-zinc-200 px-4 sm:hidden dark:border-zinc-800">
        <div className="-mb-px flex gap-1 overflow-x-auto py-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative shrink-0 whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
            >
              {link.label}
              {link.badge !== null && (
                <span className="ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
