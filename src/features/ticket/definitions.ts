import { createSearchParamsCache, parseAsString, parseAsInteger } from "nuqs/server"
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

export const paginationParser = {
  page: parseAsInteger.withDefault(0),
  size: parseAsInteger.withDefault(5)
}

export const paginationOptions = {
  shallow: false,
  clearOnDefault: true,
}

export const searchParamsCache = createSearchParamsCache({
  search: searchParser,
  sort: sortParser,
  ...paginationParser
})

export type ParsedSearchParams = ReturnType<typeof searchParamsCache.parse>
