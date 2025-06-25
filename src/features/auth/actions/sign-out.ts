"use server"

import { signInPath } from "@/paths";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const signOut = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut()
  redirect(signInPath)
}

export const signOutV2 = async () => {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut()
    if (error) throw error;

  } catch (error: unknown) {
    return {
      error: error instanceof Error ? error.message : "An error ocurred",
    }
  }
}

export default signOut;
