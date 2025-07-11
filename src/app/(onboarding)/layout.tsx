import { requireAuth } from "@/features/auth/utils/require-auth";

export default async function OnboardingLayout(
  { children }: Readonly<{ children: React.ReactNode; }>
) {

  await requireAuth()

  return <>{children}</>
}
