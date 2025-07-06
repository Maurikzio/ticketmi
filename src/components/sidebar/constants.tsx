import { Book, CircleUser, Library, Users } from "lucide-react";
import { NavItem } from "./types";
import { accountProfilePath, homePath, organizationsPath, ticketsPath } from "@/paths";

export const navItems: NavItem[] = [
  {
    title: "All tickets",
    icon: <Library className="h-5" />,
    href: homePath,
  },
  {
    title: "My tickets",
    icon: <Book className="h-5" />,
    href: ticketsPath
  },
  {
    title: "Account",
    icon: <CircleUser className="h-5" />,
    href: accountProfilePath,
    separator: true,
  },
  {
    title: "Organization",
    icon: <Users className="h-5" />,
    href: organizationsPath,
    separator: true,
  }
]

export const closedClassName =
  "text-background opacity-0 transition-all duration-300 group-hover:z-40 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100"
