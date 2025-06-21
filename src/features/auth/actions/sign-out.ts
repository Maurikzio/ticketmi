"use server"

import { signInPath } from "@/paths";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const signOut = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut()
  redirect(signInPath)
}

export default signOut;
