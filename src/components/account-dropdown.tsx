"use client"

import { Avatar, AvatarFallback } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";
import { accountPasswordPath, accountProfilePath } from "@/paths";
import { useEffect, useState } from "react";
import getProfile from "@/features/auth/queries/get-profile";
import { Profile } from "@prisma/client";
import { LucideUser } from "lucide-react";
import LogoutButton from "./logout-button-with-use-transition";

const AccountDropdown = () => {
  const [profile, setProfile] = useState<Profile | undefined>(undefined)

  useEffect(() => {
    const fetchProfileData = async () => {
      const res = await getProfile()
      setProfile(res?.profile)
    }
    fetchProfileData()
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          {profile ? <AvatarFallback>{profile.userName[0].toUpperCase()}</AvatarFallback> : null}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={accountProfilePath}>
            <LucideUser className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={accountPasswordPath}>
            <LucideUser className="mr-2 h-4 w-4" />
            <span>Password</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          {/* <form action={signOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <button type="submit">Logout</button>
          </form> */}
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AccountDropdown;
