import { createSearchParamsCache, parseAsString } from "nuqs/server"
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

// export type SearchParams = Record<string, string | undefined>;

export const searchParser = parseAsString.withDefault('').withOptions({
  shallow: false,
  clearOnDefault: true
})

export const sortParser = parseAsString.withDefault('newest').withOptions({
  shallow: false,
  clearOnDefault: true
})

export const searchParamsCache = createSearchParamsCache({
  search: searchParser,
  sort: sortParser
})

export type ParsedSearchParams = ReturnType<typeof searchParamsCache.parse>
