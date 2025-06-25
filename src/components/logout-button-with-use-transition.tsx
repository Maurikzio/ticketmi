
"use client"

import { signOutV2 } from "@/features/auth/actions/sign-out"; import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { homePath } from "@/paths";
import { LogOut } from "lucide-react";

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
    <form action={handleSignOut} className="flex items-center px-2 py-1.5">
      <LogOut className="w-4 h-4 mr-4" />
      <button type="submit" disabled={isPending} className="text-sm">
        {isPending ? "Logging out" : "Logout"}
      </button >
    </form>
  )

  // return (
  //   <button disabled={isPending} onClick={handleSignOut} className="flex justify-center items-center px-2 py-1.5 gap-4">
  //     <LogOut className="w-4 h-4" />
  //     <span className="text-sm">{isPending ? "Logging out" : "Logout"}</span>
  //   </button>
  // )
}

export default LogoutButton;
