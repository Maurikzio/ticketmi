import CardCompact from "@/components/card-compact";
import OrganizationCreateForm from "@/features/organization/components/organization-create-form";

// TODO: Move organization/create to (setup) layout
// Current: redirect from organization -> onboarding (harmless but unnecessary)
// Improvement: Direct access without redirect

export default function CreateOrganizationPage() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        title="Create Organization"
        description="Create a new organization for your team."
        className="w-full max-w-[420px] animate-fade-from-top"
        content={<OrganizationCreateForm />}
      />
    </div>
  )
}
