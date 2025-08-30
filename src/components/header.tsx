"use client";

import { Icons } from "@/components/icons";
import { ModeToggle } from "@/components/mode-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Icons.logo className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight font-headline">
            BillSplitr
          </h1>
        </div>
        <ModeToggle />
      </div>
    </header>
  );
}
