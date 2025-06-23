"use client"

import { usePathname } from "next/navigation";
import { NavItem } from "./types";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { closedClassName } from "./constants";

type SidebarItemProps = {
  isOpen: boolean;
  navItem: NavItem
}

const SidebarItem = ({ isOpen, navItem }: SidebarItemProps) => {
  const path = usePathname()
  const isActive = path === navItem.href

  return (
    <Link
      href={navItem.href}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "group relative flex h-12 justify-start",
        isActive && "bg-muted font-bold hover:bg-muted"
      )}
    >
      {navItem.icon}
      <span
        className={cn(
          "absolute left-12 text-base duration-200",
          isOpen ? "md:block hidden" : "w-[78px]",
          !isOpen && closedClassName
        )}
      >
        {navItem.title}
      </span>
    </Link>
  )
};

export default SidebarItem;
