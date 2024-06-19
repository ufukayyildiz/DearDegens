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
  Column,
  Img,
  Row,
  Section,
} from "@react-email/components"
import { currentYear } from "@/src/lib/utils"

interface EmailTemplateProps {
  userName: string
  userEmail: string
  adId: string
  adTitle: string
}

export const ListingRejectedTemplate: React.FC<
  Readonly<EmailTemplateProps>
> = ({ userName, userEmail, adId, adTitle }) => {
  const fontFamily = "HelveticaNeue,Helvetica,Arial,sans-serif"

  const main = {
    backgroundColor: "#efeef1",
    fontFamily,
  }

  const paragraph = {
    lineHeight: 1.5,
    fontSize: 14,
  }

  const container = {
    maxWidth: "580px",
    margin: "30px auto",
    backgroundColor: "#ffffff",
  }

  const footer = {
    maxWidth: "580px",
    margin: "0 auto",
  }

  const content = {
    padding: "5px 20px 10px 20px",
  }

  const logo = {
    display: "flex",
    justifyContent: "center",
    alingItems: "center",
    padding: 10,
  }

  const sectionsBorders = {
    width: "100%",
    display: "flex",
  }

  const sectionBorder = {
    borderBottom: "1px solid rgb(255, 136, 0)",
    width: "249px",
  }

  const sectionCenter = {
    borderBottom: "1px solid rgb(145,71,255)",
    width: "102px",
  }

  const link = {
    textDecoration: "underline",
  }

  return (
    <Html>
      <Head />
      <Preview>
        Your listing titled &quot;{adTitle}&quot; was rejected during the review
        process.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logo}>
            <Img
              width={500}
              src={
                "https://utfs.io/f/b862962d-902a-4cdf-9b5d-8e46e3742cf8-k3gcps.png"
              }
            />
          </Section>

          <Section style={sectionsBorders}>
            <Row>
              <Column style={sectionBorder} />
              <Column style={sectionBorder} />
              <Column style={sectionBorder} />
            </Row>
          </Section>

          <Section style={content}>
            <Text style={paragraph}>Dear {userName},</Text>
            <Text style={paragraph}>
              We regret to inform you that your listing titled &quot;{adTitle}
              &quote; was rejected during our listings review process.
            </Text>
            <Text style={paragraph}>
              We reserve the right to reject any and all listings that include
              content, in the form of text or images, which dos not meet the
              DearDegens terms of service. For more information on what type of
              content is not accepted on our platform, please review our{" "}
              <Link
                href="https://www.deardegens.com/termsofservice"
                target="_blank"
              >
                terms of service
              </Link>{" "}
              under section six, &quot;PROHIBITED ACTIVITIES&quot;.
            </Text>
            <Text style={paragraph}>
              Once you have amended your listing to be in line with the
              above-mentioned terms of service, your listing will be resubmitted
              for review by our team. To make changes to your listing, you can
              visit your listings page via the ads manager and click on the
              &quot;EDIT&quot; button to navigate to your listing&apos;s edit
              page.
            </Text>

            <Text style={paragraph}>
              Thanks,
              <br />
              DearDegens Support Team
            </Text>
          </Section>
        </Container>

        <Section style={footer}>
          {/* <Row>
          <Column align="right" style={{ width: "50%", paddingRight: "8px" }}>
            <Img src={`${baseUrl}/static/twitch-icon-twitter.png`} />
          </Column>
          <Column align="left" style={{ width: "50%", paddingLeft: "8px" }}>
            <Img src={`${baseUrl}/static/twitch-icon-facebook.png`} />
          </Column>
        </Row> */}
          <Row>
            <Text style={{ textAlign: "center", color: "#706a7b" }}>
              Copyright © {currentYear} DearDegens.com. All rights reserved.
            </Text>
            <Text style={{ textAlign: "center", color: "#706a7b" }}>
              This is a once off notification that contains important
              information for your attention.
            </Text>
            <Text style={{ textAlign: "center", color: "#706a7b" }}>
              No unsubscribe option available.
            </Text>
            <Text style={{ textAlign: "center", color: "#706a7b" }}>
              <Link
                href="https://www.deardegens.com/termsofservice"
                target="_blank"
              >
                T's & C's
              </Link>{" "}
              |{" "}
              <Link
                href="https://www.deardegens.com/privacypolicy"
                target="_blank"
              >
                Privacy
              </Link>
            </Text>
          </Row>
        </Section>
      </Body>
    </Html>
  )
}
