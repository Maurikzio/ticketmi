"use server"

import { cookies } from 'next/headers'

export const setCookieByKey = async (key: string, value: string) => {
  const cookieStore = await cookies()
  cookieStore.set(key, value)
}

export const getCookieByKey = async (key: string) => {
  const cookieStore = await cookies()
  const cookie = cookieStore.get(key);
  return cookie
}

export const deleteCookieByID = async (key: string) => {
  const cookieStore = await cookies()
  cookieStore.delete(key)
}
