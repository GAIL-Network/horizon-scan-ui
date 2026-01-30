"use client";

import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const { user } = useUser();

  const isLoggedIn = !!user;

  return (
    <nav
      className={cn("mb-5 flex min-h-20 items-center pr-1 pl-1", className)}
      style={{ borderBottom: "1px solid #eee" }}
    >
      <div className="flex h-full grow-1 justify-between gap-1">
        <div className="flex items-end">
          <Link href="/">Dashboard</Link>
          {" | "}
          <Link href="/chat">Chat</Link>
        </div>

        <div className="flex items-end text-center text-xl">Horizon Scan</div>

        <div className="flex items-end">
          {isLoggedIn ? (
            <Link href="/auth/logout">Logout</Link>
          ) : (
            <Link href="/auth/registration">Registration</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
