export interface OrganizationFormState {
  message?: string;
  status?: "success" | "error" | "idle";
  errors?: {
    name?: string[]
  }
  data?: unknown
}

export const initialCreateOrganizationState: OrganizationFormState = { message: "", errors: {}, status: "idle" }


export interface InvitationFormState {
  message?: string;
  status?: "success" | "error" | "idle";
  errors?: {
    email?: string[]
  }
  data?: unknown
}
