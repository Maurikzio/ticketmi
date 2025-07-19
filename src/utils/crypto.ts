import { generateRandomString, type RandomReader } from "@oslojs/crypto/random";
import { sha256 } from "@oslojs/crypto/sha2"
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding"

export const generateRandomToken = () => {
  const bytes = new Uint8Array(20)
  crypto.getRandomValues(bytes)
  return encodeBase32LowerCaseNoPadding(bytes)
}

export const hashToken = (token: string) => {
  return encodeHexLowerCase(sha256(new TextEncoder().encode(token)))
}

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

const random: RandomReader = {
  read(bytes) {
    crypto.getRandomValues(bytes)
  }
}

export const generateRandomCode = () => {
  return generateRandomString(random, alphabet, 8)
}
