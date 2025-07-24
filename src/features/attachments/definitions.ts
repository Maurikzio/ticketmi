export const ACCEPTED_FILES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "application/pdf"
]

export const FILE_MAX_SIZE = 1;

export interface AttachmentFormState {
  message?: string;
  status?: "success" | "error" | "idle";
  errors?: {
    files?: string[]
  }
  // data?: unknown
}
