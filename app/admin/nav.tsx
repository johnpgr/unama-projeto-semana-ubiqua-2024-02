"use client"

import { usePathname } from "next/navigation"
import { NavItem } from "./layout"
import Link from "next/link"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"

export function Nav({ navItems }: { navItems: NavItem[] }) {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex space-x-10">
      {navItems.map((item) => {
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`text-base font-medium ${
              pathname === item.href
                ? "text-primary"
                : "text-foreground hover:text-foreground/80"
            }`}
          >
            <span className="flex items-center">
              {item.icon}
              {item.name}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}

export function MobileNav({ navItems }: { navItems: NavItem[] }) {
  const pathname = usePathname()
  return (
    <>
      {navItems.map((item) => {
        return (
          <DropdownMenuItem key={item.name} asChild>
            <Link
              href={item.href}
              className={`flex items-center ${
                pathname === item.href ? "text-primary" : ""
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          </DropdownMenuItem>
        )
      })}
    </>
  )
}
