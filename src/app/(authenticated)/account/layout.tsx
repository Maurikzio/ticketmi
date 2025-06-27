import AccountTabs from "@/features/account/components/account-tabs";

export default async function AccountLayout(
  { children }: Readonly<{ children: React.ReactNode; }>
) {

  return (
    <>
      <div className="mb-8">
        <AccountTabs />
      </div>
      {children}
    </>
  )
}
