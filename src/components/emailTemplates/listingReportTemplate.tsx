import * as React from "react"
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from "@react-email/components"

interface EmailTemplateProps {
  userName: string
  userEmail: string
  reportId: string
  adId: string
  description: string
  infraction: string
}

export const listingReportTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  userName,
  userEmail,
  reportId,
  adId,
  description,
  infraction,
}) => (
  <Html>
    <Head />
    <Preview>Report sent by: {userName}</Preview>
    <Body>
      <Container>
        <Heading>Listing Report: {reportId}</Heading>
        <Text>The following report was recieved for listing ID: {adId}</Text>
        <Text>Username: {userName}</Text>
        <Text>User email: {userEmail}</Text>
        <Text>Infraction: {infraction}</Text>
        <Text>User message: {description}</Text>
      </Container>
    </Body>
  </Html>
)
