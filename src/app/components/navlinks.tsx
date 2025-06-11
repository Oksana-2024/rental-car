"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/classNameMerge";

export default function NavLinks() {
  const pathname = usePathname();

  const isHomeActive = pathname === "/";
  const isCatalogActive = pathname === "/catalog";

  return (
    <nav className="flex flex-row gap-[32px] font-medium leading-[1.25] items-center justify-end">
      <Link href="/" className={cn(isHomeActive && "active")}>
        Home
      </Link>

      <Link href="/catalog" className={cn(isCatalogActive && "active")}>
        Catalog
      </Link>
    </nav>
  );
}
