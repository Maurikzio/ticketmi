"use server"

import { requireAuth } from "@/features/auth/utils/require-auth";
import { z } from "zod";
import { CrateProfileFormState } from "../definitions";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const createProfileSchema = z.object({
  userName: z.string().min(1).max(100),
  userLastname: z.string().min(1).max(100),
})

const createProfile = async (_actionState: CrateProfileFormState, formdata: FormData): Promise<CrateProfileFormState> => {
  const context = await requireAuth({ requireProfile: false });

  const validatedFields = createProfileSchema.safeParse({
    userName: formdata.get('userName'),
    userLastname: formdata.get('userLastname')
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  const { userName, userLastname } = validatedFields.data;
  try {
    await prisma.profile.create({
      data: {
        userId: context.user.id,
        userName,
        userLastname,
        email: "ssf"
      }
    })
    revalidatePath('/', 'layout')
    return { message: "Profile created", status: "success" }
  } catch (error) {
    const message = error instanceof Prisma.PrismaClientValidationError
      ? "Something went wrong"
      : error instanceof Error ? error.message : "Something went wrong"
    return {
      status: "error",
      message,
    }
  }


};

export default createProfile;
