import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import getProfile from "../queries/get-profile";
import { upsertProfile } from "@/features/account/actions/upsert-profile";

export const PROFILE_QUERY_KEY = ['profile'] as const

export function useProfile() {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: async () => {
      const result = await getProfile()
      return result?.profile || null
    },
    staleTime: 5 * 60 * 1000, //5 minutes
    retry: 1
  })
}

export function useUpsertProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (profileData: { userName: string, userLastname: string }) => {
      const result = await upsertProfile(profileData);
      if (!result.success) {
        throw new Error(result.message || "Failed to save profile")
      }
    },
    onSuccess: (savedProfile) => {
      queryClient.setQueryData(PROFILE_QUERY_KEY, savedProfile)
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY })
    },
    onError: (error) => {
      console.error("Error saving profiel", error)
    }
  })
}


export function useProfileManager() {
  const profileQuery = useProfile()
  const upsertMutation = useUpsertProfile()

  return {
    // Estado del profile
    profile: profileQuery.data,
    isLoading: profileQuery.isLoading,
    error: profileQuery.error,
    hasProfile: !!profileQuery.data,

    //Function para guardar (crear o actualizar)
    saveProfile: upsertMutation.mutateAsync,
    isSaving: upsertMutation.isPending,
    saveError: upsertMutation.error,

    //Para uso directo en formularios
    mutation: upsertMutation
  }
}
