"use client"

import { Avatar, AvatarFallback } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";
import { accountPasswordPath, accountProfilePath } from "@/paths";
import { Loader2, LucideUser, User } from "lucide-react";
import { LogoutButton } from "@/features/auth/components/logout-button-client";
import { useProfile } from "@/features/auth/hooks/useProfile";
import { Button } from "./ui/button";

const AccountDropdown = () => {
  // const [profile, setProfile] = useState<Profile | undefined>(undefined)

  // useEffect(() => {
  //   const fetchProfileData = async () => {
  //     const res = await getProfile()
  //     setProfile(res?.profile)
  //   }
  //   fetchProfileData()
  // }, [])

  const { data: profile, isLoading } = useProfile()

  if (isLoading) {
    return (
      <Button variant='ghost' disabled>
        <Loader2 className="w-4 h-4 animate-spin" />
      </Button>
    )
  }

  if (!profile) {
    return (
      <Button variant="ghost" asChild>
        <Link href={accountProfilePath}>
          <User className="h-4 w-4" />
          <span className="ml-2 hidden md:inline">Setup Profile</span>
        </Link>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarFallback>{profile.userName[0].toUpperCase()}</AvatarFallback>
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
