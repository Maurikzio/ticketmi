"use server"

import { requireProfile } from "../utils/requireProfile"

const getProfile = async () => {
  return await requireProfile()
}

export default getProfile;
