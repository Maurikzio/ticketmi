export interface FormState {
  message?: string;
  status?: "success" | "error" | "idle";
  errors?: {
    title?: string[];
    content?: string[];
  };
  values?: {
    title?: string;
    content?: string;
  }
}
