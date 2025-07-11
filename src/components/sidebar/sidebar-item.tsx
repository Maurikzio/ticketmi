import { NavItem } from "./types";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { closedClassName } from "./constants";
import { Separator } from "../ui/separator";

type SidebarItemProps = {
  isOpen: boolean;
  navItem: NavItem;
  isActive: boolean
}

const SidebarItem = ({ isOpen, navItem, isActive }: SidebarItemProps) => {

  return (
    <>
      {navItem.separator ? <Separator /> : null}
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
    </>
  )
};

export default SidebarItem;
