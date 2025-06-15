import CardCompact from "@/components/card-compact";
import SignUpForm from "@/features/auth/components/sign-up-form";
import { signInPath } from "@/paths";
import Link from "next/link";

// interface SearchParams {
//   error?: string;
// }

// interface PageProps {
//   searchParams: Promise<SearchParams>
// }

// export default async function SignUpPage(props: PageProps) {
// const searchParams = await props.searchParams

export default async function SignUpPage() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        className="w-full max-w-[420px] animate-fade-in-from-top"
        title="Sign Up"
        description="Create an account to get started"
        content={<SignUpForm />}
        footer={
          <Link className="text-sm text-muted-foreground hover:underline" href={signInPath}>
            Have an account? Sign In now.
          </Link>
        }
      />
    </div>
  )
}
