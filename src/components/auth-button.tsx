"use client"

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button"
import { signInPath, signUpPath } from "@/paths";
import { Separator } from "./ui/separator";
// import LogoutButton from "./logout-button-with-use-transition";
import AccountDropdown from "./account-dropdown";
import useAuth from "@/features/auth/hooks/use-auth";

const AuthButton = () => {
  const { user } = useAuth()

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
