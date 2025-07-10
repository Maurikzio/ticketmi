import CardCompact from "@/components/card-compact";
import Heading from "@/components/heading";
import ProfileForm from "@/features/account/components/create-profile-form-with-react-query";
// import CreateProfileForm from "@/features/account/components/create-profile-form";
import { requireAuth } from "@/features/auth/utils/require-auth";

export default async function ProfilePage() {
  await requireAuth({ requireProfile: false });

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Profile" description="All your profie information" />
      <CardCompact
        className="w-full max-w-[420px] self-center"
        title="Create Profile"
        description="Create you profile to create tickets"
        content={<ProfileForm />}
      />
    </div>
  )
}
