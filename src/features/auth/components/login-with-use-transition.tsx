'use client'

import { useState, useTransition } from "react";
import { signInV2 } from "../actions/sign-in";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ticketsPath } from "@/paths";

const LogInForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<{ email?: string[], password?: string[] }>()

  const [isPending, startTransition] = useTransition()

  const handleLogin = (formData: FormData) => {
    startTransition(async () => {
      const result = await signInV2(formData)
      setEmail(result?.values.email || "")
      setFieldErrors(result?.errors)

      if (result?.error) {
        toast.error(result.error)
      } else {
        router.push(ticketsPath);
        // toast.success("Successfully logged in")
      }

    })
  }

  return (
    <>
      <form action={handleLogin} className="flex flex-col gap-4">
        <div>
          <Input name="email" placeholder="Email" defaultValue={email || ""} />
          {fieldErrors?.email ? (
            <p className="mt-2 text-sm text-red-500">{fieldErrors.email[0]}</p>
          ) : null}
        </div>
        <div>
          <Input name="password" placeholder="Password" type="password" />
          {fieldErrors?.password ? (
            <p className="mt-2 text-sm text-red-500">{fieldErrors.password[0]}</p>
          ) : null}
        </div>
        <Button disabled={isPending}>
          {isPending ? "Accessing" : "Login"}
        </Button>
      </form>
    </>
  )
}

export default LogInForm;
