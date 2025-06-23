import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const useAuth = () => {
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

  return { user, loading }
}

export default useAuth;
