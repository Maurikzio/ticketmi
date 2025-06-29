"use client";

import { createClient } from "@/utils/supabase/client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  };

  return (
    <button onClick={logout} className="w-full flex items-center px-2 py-1.5 rounded-sm text-sm hover:bg-accent">
      <LogOut className="w-4 h-4 mr-4" />
      Logout
    </button>
  )
}
