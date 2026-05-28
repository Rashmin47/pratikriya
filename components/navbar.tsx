"use client";

import { Map, MessageSquare, Shield, Sparkle } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import { SignInButton, UserButton, useAuth } from "@clerk/react";
import { Button } from "./ui/button";

export default function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    <nav className="sticky top-0 z-50 border-b border-stone-400/20 bg-background/75 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70">
      <div className="container mx-auto flex h-18 items-center justify-between px-4">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/" className="shrink-0">
            <div className="flex items-center gap-3 rounded-full border border-stone-400/20 bg-background/80 px-3 py-2 shadow-sm transition-colors hover:bg-muted/60">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-r from-amber-700 via-stone-700 to-emerald-700 shadow-lg shadow-stone-500/20">
                <Sparkle className="h-4 w-4 text-white" />
              </div>
              <span className="font-display text-base font-semibold tracking-tight sm:text-lg">
                Pratikriya
              </span>
            </div>
          </Link>
          <Link
            href="/roadmap"
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground md:flex"
          >
            <Map className="h-4 w-4" />
            Roadmap
          </Link>
          <Link
            href="/feedback"
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground md:flex"
          >
            <MessageSquare className="h-4 w-4" />
            Feedback
          </Link>
          {/* Admin Link*/}
          {isSignedIn && (
            <Link
              href="/admin"
              className="hidden items-center gap-2 rounded-full bg-muted/70 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted md:flex"
            >
              <Shield className="h-4 w-4" />
              Admin
            </Link>
          )}
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {!isSignedIn && (
            <SignInButton>
              <Button asChild size="sm" className="rounded-full px-5">
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </SignInButton>
          )}
          {isSignedIn && <UserButton />}
        </div>
      </div>
    </nav>
  );
}
