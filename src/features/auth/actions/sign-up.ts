"use server"

import { AuthState } from "@/features/ticket/definitions"
import { createClient } from "@/utils/supabase/server"
// import { redirect } from "next/navigation"
import { z } from "zod"

const signUpSchema = z
  .object({
    // username: z.string().min(1).max(191).refine((value) => !value.includes(" "), "Username cannot contain spaces"),
    email: z.string().min(1, { message: "Is required" }).max(191).email(),
    password: z.string().min(6).max(191),
    confirmPassword: z.string().min(6).max(191)
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"]
      })
    }
  })

const signUp = async (_actionState: AuthState, formData: FormData): Promise<AuthState> => {
  const supabase = await createClient()
  const validateFields = signUpSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword')
  })

  if (!validateFields.success) {
    return {
      message: "Missing fields. Failed to sign up.",
      errors: validateFields.error.flatten().fieldErrors,
      values: {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      }
    }
  }

  const { email, password } = validateFields.data;

  try {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) throw error;
    return {
      message: "Thank you for signing up!"
    }
  } catch (error: unknown) {
    console.error(error);
    return {
      error: error instanceof Error ? error.message : "An error ocurred",
      values: {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      }
    }
  }

  // TODO: we can add a better page with instructions
  //"/auth/sign-up-success"
  // redirect('/auth/login?message=Check your email to confirm account')
}

export default signUp
