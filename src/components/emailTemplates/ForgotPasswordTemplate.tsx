import * as React from "react"
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Link,
} from "@react-email/components"

interface EmailTemplateProps {
  userEmail: string
  resetPasswordToken: string
}

export const forgotPasswordTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  userEmail,
  resetPasswordToken,
}) => (
  <Html>
    <Head />
    <Preview>DearDegens.com: Update Password</Preview>
    <Body>
      <Container>
        <Heading>Update password for account: {userEmail}</Heading>
        <Text>Click on the link below to update your password</Text>
        <Link
          href={`${process.env.URL}/forgot-password?token=${resetPasswordToken}`}
        >
          Click here to reset password
        </Link>
      </Container>
    </Body>
  </Html>
)
