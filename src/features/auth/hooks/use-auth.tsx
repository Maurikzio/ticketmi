import { createClient } from "@/utils/supabase/client";
import { Profile } from "@prisma/client";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

type AuthData = {
  user: User;
  profile: Profile
} | null;

const useAuth = () => {
  const [data, setData] = useState<AuthData>(null);
  const [loading, setLoading] = useState(true)


  const fetchUserData = async (): Promise<AuthData> => {
    try {
      const response = await fetch('/api/me');
      if (response.ok) {
        const { user, profile } = await response.json()
        return { user, profile };
      }
      return null;
    } catch (error) {
      console.error("Error fetching user data: ", error);
      return null
    }
  }

  useEffect(() => {
    const supabase = createClient()

    // const fetchUser = async () => {
    //   const { data: { user } } = await supabase.auth.getUser();
    //   setUser(user)
    //   setLoading(false)
    // }

    const initAuth = async () => {
      const userData = await fetchUserData();
      setData(userData)
      setLoading(false)
    }

    initAuth()


    // Suscribirse a cambios de sesión
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const userData = await fetchUserData();
        setData(userData)
      } else {
        setData(null);
      }
      setLoading(false)
    })

    // Limpiar la suscripción al desmontar
    return () => subscription?.unsubscribe()
  }, [])

  return {
    user: data?.user,
    profile: data?.profile,
    loading
  }
}

export default useAuth;
