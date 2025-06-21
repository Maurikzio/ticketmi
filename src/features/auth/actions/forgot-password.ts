"use server"

import { AuthState } from "@/features/ticket/definitions"
import { createClient } from "@/utils/supabase/server"
import { z } from "zod"

const forgotPasswordSchema = z
  .object({
    email: z.string().min(1, { message: "Email is rquired" }).max(191).email()
  })

const forgotPassword = async (_actionState: AuthState, formData: FormData): Promise<AuthState> => {
  const supabase = await createClient()
  const validatedFields = forgotPasswordSchema.safeParse({
    email: formData.get("email")
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      values: {
        email: formData.get('email') as string
      }
    }
  }

  const { email } = validatedFields.data;

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/update-password`
    })

    if (error) throw error

    return {
      success: "Check your email for a password reset link",
      values: { email }
    }
  } catch (error) {
    console.error("Forgot Password error:", error)
    return {
      error: error instanceof Error ? error.message : "An error ocurred",
      values: { email }
    }
  }
}

export default forgotPassword;
