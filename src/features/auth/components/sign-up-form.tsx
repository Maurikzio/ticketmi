'use client'
import SubmitButton from "@/components/form/submit-button";
import { Input } from "@/components/ui/input";
import signUp from "../actions/sign-up";
import { useActionState } from "react";
import { AuthState } from "@/features/ticket/definitions";

const SignUpForm = () => {
  const initialState: AuthState = {}
  const [actionState, action] = useActionState(signUp, initialState)

  return (
    <>
      <form action={action} className="flex flex-col gap-4">
        <div>
          <Input name="email" placeholder="Email" defaultValue={actionState.values?.email} />
          {actionState.errors?.email ? (
            <p className="mt-2 text-sm text-red-500">{actionState.errors.email[0]}</p>
          ) : null}
        </div>
        <div>
          <Input name="password" placeholder="Password" type="password" defaultValue={actionState.values?.password} />
          {actionState.errors?.password ? (
            <p className="mt-2 text-sm text-red-500">{actionState.errors.password[0]}</p>
          ) : null}
        </div>
        <div>
          <Input name="confirmPassword" placeholder="Confirm Password" type="password" />
          {actionState.errors?.confirmPassword ? (
            <p className="mt-2 text-sm text-red-500">{actionState.errors.confirmPassword[0]}</p>
          ) : null}
        </div>
        <SubmitButton label="Sign Up" pendingLabel="Signing Up" />
      </form>
      {actionState?.message && (
        <div className="text-yellow-500 text-sm bg-secondary mt-4 p-4">
          <p className="mb-2 font-bold">{actionState.message}</p>
          <p >
            You&apos;ve successfully signed up. Please check your email to
            confirm your account before signing in.
          </p>
        </div>
      )}

      {actionState?.error && (
        <div className="max-w-[420px] w-full text-red-500 px-4 py-3 rounded">
          {actionState.error}
        </div>
      )}
    </>
  )
}

export default SignUpForm;
