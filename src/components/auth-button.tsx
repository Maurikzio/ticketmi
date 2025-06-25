"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button"
import { signInPath, signUpPath } from "@/paths";
import { Separator } from "./ui/separator";
// import LogoutButton from "./logout-button-with-use-transition";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import AccountDropdown from "./account-dropdown";

const AuthButton = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { auth } = createClient()

    auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null)
    })
  })

  if (user) {
    return (
      <>
        <Separator orientation="vertical" />
        <div className="flex gap-2 items-center">
          <AccountDropdown />
        </div>
      </>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <Link href={signUpPath} className={buttonVariants({ variant: "outline" })}>Sign Up</Link>
      <Link href={signInPath} className={buttonVariants({ variant: "outline" })}>Log In</Link>
    </div>
  )
}

export default AuthButton;
