"use server"

import { AuthState } from "@/features/ticket/definitions"
import { ticketsPath } from "@/paths"
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

const signInSchema = z
  .object({
    email: z.string().min(1, { message: "Email is required" }).max(191).email(),
    password: z.string().min(1, { message: "Password is required" }).max(191),
  })

const signIn = async (_actionState: AuthState, formData: FormData): Promise<AuthState> => {
  const supabase = await createClient()
  const validatedFields = signInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      message: "Missing fields. Failed to log in",
      errors: validatedFields.error.flatten().fieldErrors,
      values: {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      }
    }
  }

  const { email, password } = validatedFields.data;

  try {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  } catch (error: unknown) {
    console.error(error)
    return {
      error: error instanceof Error ? error.message : "An error ocurred",
      values: {
        email: formData.get('email') as string,
      }
    }
  }

  revalidatePath(ticketsPath, 'layout')
  //Si deseamos un revalidacion completa despues del login podemos hacer:
  // revalidatePath('/', 'layout')
  redirect(ticketsPath)
}

export default signIn;
