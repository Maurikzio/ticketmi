export interface CredentialFormState {
  message?: string;
  status?: "success" | "error" | "idle";
  errors?: {
    name?: string[]
  }
}
