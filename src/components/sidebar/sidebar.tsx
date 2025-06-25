"use client"

import { cn } from "@/lib/utils";
import { useState } from "react";
import { navItems } from "./constants";
import SidebarItem from "./sidebar-item";
import { usePathname } from "next/navigation";
import { getActivePath } from "@/utils/get-active-path";
import { signInPath, signUpPath } from "@/paths";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

const Sidebar = () => {
  const [isTransition, setIsTransition] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const { auth } = createClient()

  auth.onAuthStateChange(async (event, session) => {
    setUser(session?.user || null)
  })

  const { activeIndex } = getActivePath(pathname, navItems.map(item => item.href), [signInPath, signUpPath])

  const handleToggle = (open: boolean) => {
    setIsTransition(true);
    setIsOpen(open);
    setTimeout(() => setIsTransition(false), 200)
  }

  if (!user) {
    return <div className="w-[78px] bg-secondary/20" />
  }

  return (
    <nav
      className={cn(
        "animate-sidebar-from-left",
        "h-screen border-r pt-24",
        isTransition && "duration-200",
        isOpen ? "md:w-60 w-[78px]" : "w-[78px]"
      )}
      onMouseEnter={() => handleToggle(true)}
      onMouseLeave={() => handleToggle(false)}
    >
      <div className="px-3 py-2">
        <nav className="space-y-2">
          {navItems.map((navItem, index) => (
            <SidebarItem
              key={navItem.title}
              isOpen={isOpen}
              navItem={navItem}
              isActive={activeIndex === index}
            />
          ))}
        </nav>
      </div>
    </nav>
  )
}

export default Sidebar;


