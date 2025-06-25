
"use client"

import { signOutV2 } from "@/features/auth/actions/sign-out";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { homePath } from "@/paths";

const LogoutButton = () => {

  const router = useRouter();

  const [isPending, startTransition] = useTransition()

  const handleSignOut = () => {
    startTransition(async () => {
      const result = await signOutV2()

      if (result?.error) {
        toast.error(result.error)
      } else {
        router.push(homePath);
        toast.success("Successfully signed out")
      }

    })
  }

  return (
    <Button variant="outline" disabled={isPending} onClick={handleSignOut}>
      {isPending ? "Logging out" : "Logout"}
    </Button>
  )
}

export default LogoutButton;
