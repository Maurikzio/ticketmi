import { Body, Button, Container, Head, Html, Section, Tailwind, Text } from "@react-email/components"


interface EmailPasswordResetProps {
  toName: string;
  url: string;
}
const EmailPasswordReset = ({ toName, url }: EmailPasswordResetProps) => {
  return <Html>
    <Head />
    <Tailwind>
      <Body className="font-sans m-8 text-center">
        <Container>
          <Section>
            <Text>
              Hello {toName}, you have requested to reset your password. Click
              the button below to reset your password.
            </Text>
          </Section>
          <Section>
            <Button href={url} className="bg-black text-white p-2 m-2 rounded">Reset Password</Button>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
}

EmailPasswordReset.PreviewProps = {
  toName: "John Doe",
  url: "http://localhost:3000/auth/update-password"
}

export default EmailPasswordReset;
