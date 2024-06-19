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
  userEmail: string
  resetPasswordToken: string
}

const formattedDate = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeStyle: "medium",
})

export const forgotPasswordTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  userEmail,
  resetPasswordToken,
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
      <Preview>You forgot the password for your DearDegens account</Preview>
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
            <Text style={paragraph}>Hi,</Text>
            <Text style={paragraph}>
              You requested to update your password for your DearDegens account{" "}
              {userEmail}. If this was not you, please contact us immeadiately
              at support@deardegens.com
            </Text>
            <Text style={paragraph}>
              However if you did request this password change, please click on
              the following link to{" "}
              <Link
                href={`${process.env.URL}/forgot-password?token=${resetPasswordToken}`}
                style={link}
              >
                reset your account password
              </Link>{" "}
              immediately.
            </Text>
            <Text style={paragraph}>
              Remember to use a password that is both strong and unique to your
              DearDegens account.
            </Text>
            <Text style={paragraph}>
              Still have questions? Please contact{" "}
              <Link href="mailto:support@deardegens.com" style={link}>
                DearDegens Support
              </Link>
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
