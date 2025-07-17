import { Body, Button, Container, Head, Html, Section, Tailwind, Text } from "@react-email/components";

interface EmailInvitationProps {
  fromUser: string;
  fromOrganization: string;
  url: string;
}

const EmailInvitation = ({ fromUser, fromOrganization, url }: EmailInvitationProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="font-sans m-8 text-left">
          <Container>
            <Section>
              <Text>
                Hello there, {fromUser} invited you to join {fromOrganization}.<br />
                Click the link below to accept the invitation.
              </Text>
            </Section>
            <Section>
              <Button
                href={url}
                className="bg-[#155dfb] rounded text-white p-2 m-2"
              >Accept Invitation</Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html >
  )
}

EmailInvitation.PreviewProps = {
  fromUser: "John Doe",
  fromOrganization: "ACME",
  url: "http://localhost:3000/email-invitation/abc123"
} as EmailInvitationProps;


export default EmailInvitation;
