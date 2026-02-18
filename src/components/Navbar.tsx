"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

import { cn } from "@/lib/utils";
import { NavLink } from "./NavLink";
import Button from "./Button";
import { useAuthModal } from "@/features/context/AuthModalContext";
import { useUser } from "@/features/auth/hooks/useUser";

interface NavbarProps {
  className?: string;
}

const LEFT_NAV_LINKS = [
  {
    href: "/command-center",
    label: "Command Center",
    exact: true,
    isComingSoon: true,
  },
  { href: "/change-events", label: "Change Events", isComingSoon: false },
  {
    href: "/regulatory-programmes",
    label: "Regulatory Programmes",
    isComingSoon: false,
  },
  { href: "/work", label: "Work", isComingSoon: true },
  { href: "/reports", label: "Reports", isComingSoon: true },
  { href: "/chat", label: "Chat", isComingSoon: true },
];

const comingSoonPanelClass =
  "relative border border-orange-300 bg-orange-50/40 hover:bg-orange-50";

export function Navbar({ className }: NavbarProps) {
  const pathname = usePathname();
  const { user } = useUser();
  const { open: openAuthModal } = useAuthModal();

  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const isLoggedIn = Boolean(user);
  const isOnboarded = Boolean(user && user?.organisation);
  const isAdmin = Boolean(user?.role == "ADMIN" || user?.role == "OWNER");

  const closeMenus = () => {
    setIsLeftOpen(false);
    setIsRightOpen(false);
  };

  const isSelected = (href: string, exact = false) =>
    exact
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);

  // close on route change
  useEffect(closeMenus, [pathname]);

  // close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target as Node)) closeMenus();
    }

    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenus();
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className={cn(
        "border-b border-slate-500 bg-slate-700 text-white",
        "sticky top-0 z-50 w-full",
        className,
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-3">
          {/* mobile menu toggle */}
          {isOnboarded && (
            <Button
              className="sm:hidden"
              onClick={() => {
                setIsLeftOpen((v) => !v);
                setIsRightOpen(false);
              }}
            >
              Menu
            </Button>
          )}

          {/* Brand */}
          <div className="font-semibold tracking-tight text-white">
            Compliance<span className="opacity-70">Live</span>
          </div>
        </div>

        {/* CENTER NAV */}
        {isOnboarded && (
          <div
            className={cn(
              "absolute top-full left-0 z-50 w-full bg-slate-700 p-2 shadow-lg",
              "flex-col gap-1 sm:static sm:flex sm:w-auto sm:flex-row sm:bg-transparent sm:p-0 sm:shadow-none",
              isLeftOpen ? "flex" : "hidden sm:flex",
            )}
          >
            {LEFT_NAV_LINKS.map(({ href, label, exact, isComingSoon }) => (
              <NavLink
                key={href}
                href={href}
                isSelected={isSelected(href, exact)}
                onClick={closeMenus}
                className={cn(
                  "rounded px-3 py-2 text-sm transition",
                  "hover:bg-white/10",
                  isSelected(href, exact) && "bg-white/10",
                  isComingSoon && comingSoonPanelClass,
                )}
              >
                {label}
              </NavLink>
            ))}
          </div>
        )}

        {/* RIGHT ACCOUNT */}
        <div className="relative">
          <Button
            className="flex flex-col items-end gap-0 text-right"
            onClick={() => {
              setIsRightOpen((v) => !v);
              setIsLeftOpen(false);
            }}
          >
            {isLoggedIn ? (
              <>
                <div className="text-sm font-medium">Account</div>
                <div className="text-xs opacity-80">{user?.email}</div>

                {isOnboarded && user?.organisation?.name && (
                  <div className="max-w-[160px] truncate text-xs opacity-60">
                    {user.organisation.name}
                  </div>
                )}

                {isOnboarded && user?.role && (
                  <div className="max-w-[160px] truncate text-xs opacity-60">
                    {user.role}
                  </div>
                )}
              </>
            ) : (
              <div className="text-sm">Register</div>
            )}
          </Button>

          {/* dropdown */}
          <div
            className={cn(
              "absolute right-0 mt-2 w-44 rounded-md border border-gray-200 bg-white p-2 shadow-xl",
              "flex flex-col gap-1 text-sm text-black",
              isRightOpen ? "flex" : "hidden",
            )}
          >
            {isLoggedIn ? (
              <>
                {isOnboarded && isAdmin && (
                  <NavLink
                    href={`/organisations/${user?.organisation?.id}`}
                    onClick={closeMenus}
                  >
                    {user?.organisation?.name}
                  </NavLink>
                )}

                <NavLink
                  href={`/auth/logout`}
                  onClick={closeMenus}
                >
                  Logout
                </NavLink>
              </>
            ) : (
              <Button
                onClick={() => {
                  openAuthModal("register");
                  closeMenus();
                }}
              >
                Register
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
