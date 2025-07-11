export interface CrateProfileFormState {
  message?: string;
  status?: "success" | "error" | "idle";
  errors?: {
    userName?: string[];
    userLastname?: string[];
  };
  values?: {
    userName?: string;
    userLastname?: string;
  }
}
