import CardCompact from "@/components/card-compact";
import LogInForm from "@/features/auth/components/login-with-use-transition";
import { forgotPasswordPath, signUpPath } from "@/paths";
import Link from "next/link";

export default function LogInPage() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        className="w-full max-w-[420px] animate-fade-in-from-top"
        title="Log In"
        description="Log in to your account."
        content={<LogInForm />}
        footer={
          <div className="flex-1 flex justify-between">
            <Link className="text-sm text-muted-foreground hover:underline" href={signUpPath}>
              Not account yet?
            </Link>
            <Link className="text-sm text-muted-foreground hover:underline" href={forgotPasswordPath}>
              Forgot Password?
            </Link>
          </div>
        }
      />
    </div>
  )
}
