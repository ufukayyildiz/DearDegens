"use client"
import React, { useEffect } from "react"
import Lenis from "@studio-freight/lenis"
import { PageHeading } from "@/src/components/components-typography/PageHeading"
import { Heading } from "@/src/components/components-typography/Heading"
import { Subheading } from "@/src/components/components-typography/Subheading"
import { Paragraph } from "@/src/components/components-typography/Paragraph"

export default function Disclaimer() {
  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: any) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])
  return (
    <div className="mb-20 p-5 md:p-16">
      <PageHeading>DISCLAIMER</PageHeading>
      <Subheading className="pl-0 text-muted-foreground">
        Last updated February 09, 2024
      </Subheading>
      <Heading>WEBSITE DISCLAIMER</Heading>
      <Paragraph>
        The information provided by DearDegens (Pty) Ltd (&quot;we,&quot;
        &quot;us,&quot; or &quot;our&quot;) on www.deardegens.com (the
        &quot;Site&quot;) and our mobile application is for general
        informational purposes only. All information on the Site and our mobile
        application is provided in good faith, however we make no representation
        or warranty of any kind, express or implied, regarding the accuracy,
        adequacy, validity, reliability, availability, or completeness of any
        information on the Site or our mobile application. UNDER NO CIRCUMSTANCE
        SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND
        INCURRED AS A RESULT OF THE USE OF THE SITE OR OUR MOBILE APPLICATION OR
        RELIANCE ON ANY INFORMATION PROVIDED ON THE SITE AND OUR MOBILE
        APPLICATION. YOUR USE OF THE SITE AND OUR MOBILE APPLICATION AND YOUR
        RELIANCE ON ANY INFORMATION ON THE SITE AND OUR MOBILE APPLICATION IS
        SOLELY AT YOUR OWN RISK.
      </Paragraph>

      <Heading>USER INTERACTION DISCLAIMER</Heading>

      <Paragraph>
        This Site hereby disclaims any liability arising from interactions
        occurring both on and off its platform among users. Consequently, it is
        imperative for all users to take note of the following:
      </Paragraph>

      <Subheading>User Responsibility:</Subheading>
      <Paragraph>
        Users are solely responsible for their interactions and transactions.
        The app is not liable for any harm, damages, or disputes arising from
        user activities on the platform.
      </Paragraph>
      <Subheading>Verification and Precautions:</Subheading>
      <Paragraph>
        Users are encouraged to verify the identity and legitimacy of other
        users before engaging in any transactions. Take necessary precautions,
        such as meeting in public places, informing someone about meetings, and
        verifying product details.
      </Paragraph>
      <Subheading>In-Person Meetings:</Subheading>
      <Paragraph>
        When meeting in person, exercise caution and prioritize safety. The app
        is not responsible for any harm or damages resulting from in-person
        meetings arranged through the platform.
      </Paragraph>
      <Subheading>Shipping and Transactions:</Subheading>
      <Paragraph>
        Users engaging in transactions involving shipping or money transfers
        should exercise due diligence. The app is not responsible for any loss
        of property, financial loss, or fraudulent activities related to
        shipping or monetary transactions.
      </Paragraph>
      <Subheading>Fraud Awareness:</Subheading>
      <Paragraph>
        Users are urged to be vigilant against fraudulent activities, including
        but not limited to phishing, scams, and misleading advertisements.
        Report any suspicious activity to the app immediately.
      </Paragraph>
    </div>
  )
}
