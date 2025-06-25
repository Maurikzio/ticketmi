import { signInPath } from "@/paths";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function TicketsLayout(
  { children }: Readonly<{ children: React.ReactNode; }>
) {

  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser();

  if (!user || error) {
    redirect(signInPath)
  }

  return <>{children}</>
}
