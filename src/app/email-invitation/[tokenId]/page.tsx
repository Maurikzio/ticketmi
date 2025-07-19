import CardCompact from "@/components/card-compact";
import InvitationAcceptForm from "@/features/invitation/components/invitation-accept-form";

interface EmailInvitationPageProps {
  params: Promise<{ tokenId: string }>
}
export default async function EmailInvitationPage({ params }: EmailInvitationPageProps) {
  const { tokenId } = await params;

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        title="Invitation to Organization"
        description="Accept the invitation to join the organization"
        className="w-full max-w-[420px] animate-fade-from-top"
        content={<InvitationAcceptForm tokenId={tokenId} />}
      />
    </div>
  )
}
