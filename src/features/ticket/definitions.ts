export interface FormState {
  message?: string;
  errors?: {
    title?: string[];
    content?: string[];
  };
}
