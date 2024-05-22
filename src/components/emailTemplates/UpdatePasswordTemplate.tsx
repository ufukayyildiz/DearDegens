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
  userName: string
  userEmail: string
  resetPasswordToken: string
}

export const updatePasswordTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  userName,
  userEmail,
  resetPasswordToken,
}) => (
  <Html>
    <Head />
    <Preview>DearDegens.com: Update Password</Preview>
    <Body>
      <Container>
        <Heading>Update password for account: {userEmail}</Heading>
        <Text>Hey {userName}!</Text>
        <Text>Click on the link below to update your password</Text>
        <Link
          href={`${process.env.URL}/reset-password?token=${resetPasswordToken}`}
        >
          Click here to reset password
        </Link>
      </Container>
    </Body>
  </Html>
)
