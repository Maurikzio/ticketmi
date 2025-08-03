"use server"

import { z } from "zod";
import { CredentialFormState } from "../definitions";
import { getAdminOrRedirect } from "@/features/organization/query/get-admin-or-redirect";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { credentialsPath } from "@/paths";
import { generateCredential } from "../utils/generate-credential";

const createCredentialSchema = z.object({
  name: z.string().min(1, { message: "Is required" }).max(191)
})

export const CreateCredential = async (organizationId: string, _actionState: CredentialFormState, formData: FormData): Promise<CredentialFormState> => {
  await getAdminOrRedirect(organizationId)

  const validatedFields = createCredentialSchema.safeParse({
    name: formData.get("name")
  })

  let secret;

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  try {
    const { name } = validatedFields.data;

    secret = await generateCredential(organizationId, name)
  } catch (error) {
    const message = error instanceof Prisma.PrismaClientValidationError
      ? "Something went wrong"
      : error instanceof Error ? error.message : "Something went wrong"
    return {
      status: "error" as const,
      message,
    }
  }

  revalidatePath(credentialsPath(organizationId))
  return { status: "success" as const, message: `Copy the secret, we will not show it again: ${secret}` }
}
