import AccountTabs from "@/features/account/components/account-tabs";
import { requireAuth } from "@/features/auth/utils/require-auth";

export default async function AccountLayout(
  { children }: Readonly<{ children: React.ReactNode; }>
) {

  await requireAuth({ requireProfile: false })

  return (
    <>
      <div className="mb-8">
        <AccountTabs />
      </div>
      {children}
    </>
  )
}
