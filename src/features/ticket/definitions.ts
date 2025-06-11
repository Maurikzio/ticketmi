export interface FormState {
  message?: string;
  status?: "success" | "error" | "idle";
  errors?: {
    title?: string[];
    content?: string[];
    deadline?: string[];
    bounty?: string[]
  };
  values?: {
    title?: string;
    content?: string;
    deadline?: string;
    bounty?: number
  }
  timestamp?: number
}
