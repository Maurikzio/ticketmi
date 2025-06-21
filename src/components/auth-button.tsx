"use client"
import { useEffect, useState } from "react";
import LogoutButton from "./logout-button";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button"
import { signInPath, signUpPath } from "@/paths";
import { Separator } from "./ui/separator";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

const AuthButton = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user)
      setLoading(false)
    }

    fetchUser()

    // Suscribirse a cambios de sesión
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    // Limpiar la suscripción al desmontar
    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  if (loading) {
    return (
      <div className="flex gap-2 items-center">
        <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
      </div>
    )
  }

  if (user) {
    return (
      <>
        <Separator orientation="vertical" />
        <div className="flex gap-2 items-center">
          <p className="text-sm">Hey, {user.email}!</p>
          <LogoutButton />
        </div>
      </>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <Link href={signUpPath} className={buttonVariants({ variant: "outline" })}>Sign Up</Link>
      <Link href={signInPath} className={buttonVariants({ variant: "outline" })}>Log In</Link>
    </div>
  )
}

export default AuthButton;
