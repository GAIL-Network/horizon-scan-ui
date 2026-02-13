"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { NavLink } from "./NavLink";
import Button from "./Button";
import { useAuthModal } from "@/features/context/AuthModalContext";

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
  { href: "/changes", label: "Changes", isComingSoon: true },
  { href: "/change-events", label: "Change Events", isComingSoon: false },
  { href: "/programmes", label: "Programmes", isComingSoon: true },
  { href: "/work", label: "Work", isComingSoon: true },
  { href: "/reports", label: "Reports", isComingSoon: true },
  { href: "/chat", label: "Chat", isComingSoon: true },
];

const comingSoonPanelClass =
  "relative cursor-pointer border border-orange-300 bg-orange-50/40 " +
  "hover:bg-orange-50 transition";

export function Navbar({ className }: NavbarProps) {
  const pathname = usePathname();
  const { user } = useUser();
  const { open: openAuthModal } = useAuthModal();

  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(false);

  useEffect(() => {
    closeMenus();
  }, [pathname]);

  const isLoggedIn = Boolean(user);

  const closeMenus = () => {
    setIsLeftOpen(false);
    setIsRightOpen(false);
  };

  const isSelected = (href: string, exact = false) =>
    exact
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav
      className={cn(
        "border-b border-slate-500",
        "relative z-50 flex min-h-20 w-full bg-slate-600",
        className,
      )}
    >
      <div className="relative flex w-full items-center justify-between gap-2 px-2">
        {/* Left toggle (mobile) */}
        <Button
          className="sm:hidden"
          onClick={() => {
            setIsLeftOpen((v) => !v);
            setIsRightOpen(false);
          }}
        >
          Menu
        </Button>

        <div
          className={cn(
            "absolute top-full left-0 z-50 w-full p-2",
            "flex-col gap-1",
            "sm:static sm:flex sm:w-auto sm:flex-row sm:p-0",
            isLeftOpen ? "flex" : "hidden sm:flex",
          )}
        >
          {/* Left nav */}
          {LEFT_NAV_LINKS.map(({ href, label, exact, isComingSoon }) => (
            <NavLink
              className={cn(isComingSoon && comingSoonPanelClass)}
              key={href}
              href={href}
              isSelected={isSelected(href, exact)}
              onClick={closeMenus}
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Right toggle (mobile) */}
        <Button
          className="flex flex-col items-end gap-1"
          onClick={() => {
            setIsRightOpen((v) => !v);
            setIsLeftOpen(false);
          }}
        >
          <div>Account</div>

          {user && <div className="text-xs">{user.email}</div>}
        </Button>
        <div
          className={cn(
            "absolute top-full right-0 z-50 bg-gray-100 p-2",
            "flex-col gap-1",
            isRightOpen ? "flex" : "hidden",
          )}
        >
          {isLoggedIn ? (
            <NavLink
              href="/auth/logout"
              isSelected={isSelected("/auth/logout", true)}
              onClick={closeMenus}
            >
              Logout
            </NavLink>
          ) : (
            <>
              <Button
                onClick={() => {
                  openAuthModal("register");
                  closeMenus();
                }}
              >
                Registration
              </Button>
              <Button
                onClick={() => {
                  openAuthModal("login");
                  closeMenus();
                }}
              >
                Login
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
