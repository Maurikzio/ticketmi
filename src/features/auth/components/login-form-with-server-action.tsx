'use client'
import SubmitButton from "@/components/form/submit-button";
import { Input } from "@/components/ui/input";
import signIn from "../actions/sign-in";
import { AuthState } from "@/features/ticket/definitions";
import { useActionState } from "react";

const LogInForm = () => {
  const initialState: AuthState = {}
  const [actionState, action] = useActionState(signIn, initialState)
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
          <Input name="password" placeholder="Password" type="password" />
          {actionState.errors?.password ? (
            <p className="mt-2 text-sm text-red-500">{actionState.errors.password[0]}</p>
          ) : null}
        </div>
        <SubmitButton label="Login" pendingLabel="Accessing" />
      </form>
      {actionState?.error && (
        <div className="text-red-500 bg-secondary mt-4 p-4 rounded">
          {actionState.error}
        </div>
      )}
    </>
  )
}

export default LogInForm;
