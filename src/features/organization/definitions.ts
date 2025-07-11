export interface OrganizationFormState {
  message?: string;
  status?: "success" | "error" | "idle";
  errors?: {
    name?: string[]
  }
  data?: unknown
}

export const initialCreateOrganizationState: OrganizationFormState = { message: "", errors: {}, status: "idle" }
