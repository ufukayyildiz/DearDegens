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

export const ListingCreatedTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  userName,
  userEmail,
  adId,
  adTitle,
}) => {
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
        A listing titled &quot;{adTitle}&quot; is awaiting review.
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
            <Text style={paragraph}>DearDegens Team!</Text>
            <Text style={paragraph}>
              There is a new/updated listing &quot;{adTitle}
              &quote; that is awaiting a detailed review before being let loose
              on the system. Please visit the admin page to continue.
            </Text>
            <Text style={paragraph}>Author Name: &quote;{userName}&quote;</Text>
            <Text style={paragraph}>
              Author Email: &quote;{userEmail}&quote;
            </Text>
            <Text style={paragraph}>Listing ID: &quote;{adId}&quote;</Text>
            <Text style={paragraph}>
              Listing Title: &quote;{adTitle}&quote;
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
                T&apos;s & C&apos;s
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
