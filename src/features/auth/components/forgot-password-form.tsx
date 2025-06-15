"use client"

import SubmitButton from "@/components/form/submit-button";
import { Input } from "@/components/ui/input";
import { AuthState } from "@/features/ticket/definitions";
import { useActionState } from "react";
import forgotPassword from "../actions/forgot-password";
import CardCompact from "@/components/card-compact";
import { signInPath } from "@/paths";
import Link from "next/link";

const ForgotPasswordForm = () => {
  const initialState: AuthState = {}
  const [actionState, action] = useActionState(forgotPassword, initialState)

  if (actionState.success) {
    return (
      <CardCompact
        className="w-full max-w-[420px] animate-fade-in-from-top"
        title="Check Your Email"
        description="We've sent a password reset link to your email address."
        content={
          <p className="text-sm">
            If you registered using your email and password, you will receive
            a password reset email.
          </p>
        }
      />
    )
  }

  return (
    <CardCompact
      className="w-full max-w-[420px] animate-fade-in-from-top"
      title="Reset your password"
      description="Type in your email and we&apos;ll send you a link to reset your password"
      content={
        <>
          <form action={action} className="flex flex-col gap-4">
            <div>
              <Input name="email" placeholder="m@example.com" defaultValue={actionState.values?.email} />
              {actionState.errors?.email ? (
                <p className="mt-2 text-sm text-red-500">{actionState.errors.email[0]}</p>
              ) : null}
            </div>
            <SubmitButton label="Send reset email" pendingLabel="Sending..." />
          </form>
          {actionState?.error && (
            <div className="max-w-[420px] w-full text-red-500 bg-secondary mt-4 p-4 rounded">
              {actionState.error}
            </div>
          )}
        </>
      }
      footer={
        <div className=" text-center text-sm">
          Already have an account?{" "}
          <Link
            href={signInPath}
            className="underline underline-offset-4"
          >
            Login
          </Link>
        </div>
      }
    />
  )
}

export default ForgotPasswordForm;
