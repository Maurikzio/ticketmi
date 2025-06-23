"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { accountPasswordPath, accountProfilePath } from "@/paths"
import Link from "next/link"
import { usePathname } from "next/navigation"

const AccountTabs = () => {
  const pathname = usePathname();

  return (
    <Tabs value={pathname.split('/').at(-1)}>
      <TabsList>
        <TabsTrigger asChild value="profile">
          <Link href={accountProfilePath}>Profile</Link>
        </TabsTrigger>
        <TabsTrigger asChild value="password">
          <Link href={accountPasswordPath}>Password</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export default AccountTabs;
