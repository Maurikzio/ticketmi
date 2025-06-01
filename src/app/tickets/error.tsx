'use client'

import Placeholder from "@/components/placeholder"

interface ErrorProps {
  error: Error
}

export default function Error({ error }: ErrorProps) {
  return <Placeholder label={error.message || "Something went wrong"} />
}
