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

export interface AuthState {
  success?: string;
  message?: string;
  error?: string;
  errors?: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[]
  },
  values?: {
    email?: string;
    password?: string
  }
}
