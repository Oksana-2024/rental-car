"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx"; 

export default function NavLinks() {
  const pathname = usePathname();

  const isHomeActive = pathname === "/";
  const isCatalogActive = pathname === "/catalog"; 

  return (
    <nav className="flex flex-row gap-[32px] bg-white font-medium leading-[1.25] items-center justify-end">
      <Link href="/" className={clsx(isHomeActive && "active")}>
        Home
      </Link>

      <Link href="/catalog" className={clsx(isCatalogActive && "active")}>
        Catalog
      </Link>
    </nav>
  );
}
