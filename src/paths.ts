export const homePath = "/";

export const ticketsPath = "/tickets";
export const ticketPath = (ticketId: string) => `/tickets/${ticketId}`
export const ticketEditPath = (ticketId: string) => `/tickets/${ticketId}/edit`

export const signUpPath = '/auth/signup'
export const signInPath = '/auth/login'

export const forgotPasswordPath = '/auth/forgot-password'

export const accountProfilePath = "/account/profile";
export const accountPasswordPath = "/account/password"

export const organizationsPath = "/organization"
export const organizationCreatePath = "/organization/create"
export const organizationMembers = (organizationId: string) => `/organization/${organizationId}/members`

export const onboardingPath = "/onboarding"
export const selectActiveOrganizationPath = "/onboarding/select-active-organization"
