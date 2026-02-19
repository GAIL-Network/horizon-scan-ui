// src/components/NavSide.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NavLink } from "@/components/NavLink";
import Button from "@/components/Button";
import { useAuthModal } from "@/features/context/AuthModalContext";
import { useUser } from "@/features/auth/hooks/useUser";

const LEFT_NAV_LINKS = [
  { href: "/command-center", label: "Command Center", exact: true },
  { href: "/change-events", label: "Change Events" },
  { href: "/regulatory-programmes", label: "Regulatory Programmes" },
  { href: "/work", label: "Work" },
  { href: "/reports", label: "Reports" },
  { href: "/chat", label: "Chat" },
];

export function NavSide({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useUser();
  const { open: openAuthModal } = useAuthModal();

  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const isLoggedIn = Boolean(user);
  const isOnboarded = Boolean(user?.organisation);
  const isAdmin = Boolean(user?.role === "ADMIN" || user?.role === "OWNER");

  const isSelected = (href: string, exact?: boolean) =>
    exact
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);

  const closeAll = () => {
    setOpen(false);
    setAccountOpen(false);
  };

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* ───────── TOP NAVBAR ───────── */}
      <nav className="fixed top-0 right-0 left-0 z-50 border-b border-slate-700 bg-slate-800 text-white">
        <div className="flex items-start justify-between px-6 py-3">
          {/* LEFT: brand */}
          <div className="flex items-center gap-3 pt-1">
            {isOnboarded && (
              <button
                onClick={() => setOpen(true)}
                className="rounded-md p-2 hover:bg-white/10 lg:hidden"
              >
                <Menu size={20} />
              </button>
            )}

            <div className="text-lg font-semibold tracking-tight">
              Compliance<span className="opacity-70">Live</span>
            </div>
          </div>

          {/* RIGHT: account */}

          {/* ───────── ACCOUNT ───────── */}
          <div
            ref={ref}
            className="relative"
          >
            <button
              onClick={() => setAccountOpen((v) => !v)}
              className="cursor-pointer text-right text-sm leading-tight hover:opacity-90"
            >
              {user ? (
                <>
                  <div className="font-medium">Account</div>
                  <div className="text-xs opacity-80">{user.email}</div>

                  {user.organisation?.name && (
                    <div className="text-xs opacity-60">
                      {user.organisation.name}
                    </div>
                  )}

                  {user.role && (
                    <div className="text-xs opacity-60">{user.role}</div>
                  )}
                </>
              ) : (
                <div className="font-medium">Register</div>
              )}
            </button>

            {/* dropdown */}
            {accountOpen && (
              <div className="absolute right-0 z-50 mt-2 flex w-48 flex-col gap-2 rounded-md border bg-white p-2 text-black shadow-xl">
                {user ? (
                  <>
                    {isOnboarded && isAdmin && (
                      <NavLink
                        href={`/organisations/${user.organisation?.id}`}
                        onClick={closeAll}
                        className="block rounded px-2 py-1 hover:bg-gray-100"
                      >
                        {user.organisation?.name}
                      </NavLink>
                    )}

                    <NavLink
                      href="/auth/logout"
                      onClick={closeAll}
                      className="block rounded px-2 py-1 hover:bg-gray-100"
                    >
                      Logout
                    </NavLink>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      openAuthModal("register");
                      closeAll();
                    }}
                    className="w-full rounded px-2 py-1 text-left hover:bg-gray-100"
                  >
                    Register
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* ───────── SIDEBAR ───────── */}
      <aside
        className={cn(
          "fixed top-[90px] bottom-0 left-0 z-40 w-64 bg-slate-900 text-white",
          "transform transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
        )}
      >
        <div className="flex flex-col gap-1 p-3">
          {LEFT_NAV_LINKS.map(({ href, label, exact }) => (
            <NavLink
              key={href}
              href={href}
              isSelected={isSelected(href, exact)}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded px-3 py-2 text-sm text-slate-200 transition",
                "hover:bg-white/10 hover:text-white",
                isSelected(href, exact) && "bg-white/20 font-medium text-white",
                isSelected(href, exact) &&
                  "relative bg-white/10 font-medium text-white before:absolute before:top-0 before:left-0 before:h-full before:w-1 before:bg-white",
              )}
            >
              {label}
            </NavLink>
          ))}
        </div>
      </aside>

      {/* overlay mobile */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ───────── MAIN CONTENT ───────── */}
      <main className={cn("pt-24 lg:pl-64", "transition-all")}>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
