"use client"

import { useState } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button"
import { signInPath, signUpPath } from "@/paths";
import { Separator } from "./ui/separator";
import LogoutButton from "./logout-button-with-use-transition";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

const AuthButton = () => {
  const [user, setUser] = useState<User | null>(null);
  const { auth } = createClient()

  auth.onAuthStateChange(async (event, session) => {
    setUser(session?.user || null)
  })

  if (user) {
    return (
      <>
        <Separator orientation="vertical" />
        <div className="flex gap-2 items-center">
          {/* <p className="text-sm">Hey, {user.email}!</p> */}
          <LogoutButton />
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
