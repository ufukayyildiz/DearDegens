"use client"
import React from "react"
import Link from "next/link"
import { PageHeading } from "@/src/components/pageLegal/PageHeading"
import { Heading } from "@/src/components/pageLegal/Heading"
import { Subheading } from "@/src/components/pageLegal/Subheading"
import { Paragraph } from "@/src/components/pageLegal/Paragraph"
import { BulletBody } from "@/src/components/pageLegal/BulletBody"
import { BulletPoint } from "@/src/components/pageLegal/BulletPoint"
import { Index } from "@/src/components/pageLegal/Index"
import { ChevronUp } from "lucide-react"

export default function TermsOfService() {
  return (
    <div className="mb-20 p-5 md:p-16">
      <PageHeading>TERMS OF SERVICE</PageHeading>
      <Subheading className="pl-0 text-muted-foreground">
        Last updated February 09, 2024
      </Subheading>
      <Heading>AGREEMENT TO OUR LEGAL TERMS</Heading>
      <Paragraph>
        We are DearDegens (Pty) Ltd (&quot;Company&quot;, &quot;we&quot;,
        &quot;us&quot;, or &quot;our&quot;), a company registered in South
        Africa.
      </Paragraph>

      <Paragraph>
        We operate the website https://www.deardegens.com (the
        &quot;Site&quot;), as well as any other related products and services
        that refer or link to these legal terms (the &quot;Legal Terms&quot;)
        (collectively, the &quot;Services&quot;).
      </Paragraph>

      <Paragraph>
        You can contact us by email at support@deardegens.com.
      </Paragraph>

      <Paragraph>
        These Legal Terms constitute a legally binding agreement made between
        you, whether personally or on behalf of an entity (&quot;you&quot;), and
        DearDegens (Pty) Ltd, concerning your access to and use of the Services.
        You agree that by accessing the Services, you have read, understood, and
        agreed to be bound by all of these Legal Terms.{" "}
        <span className="font-semibold">
          IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE
          EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE
          USE IMMEDIATELY.
        </span>
      </Paragraph>

      <Paragraph>
        We will provide you with prior notice of any scheduled changes to the
        Services you are using. The modified Legal Terms will become effective
        upon posting or notifying you by support@deardegens.com, as stated in
        the email message. By continuing to use the Services after the effective
        date of any changes, you agree to be bound by the modified terms.
      </Paragraph>

      <Paragraph>
        The Services are intended for users who are at least 13 years of age.
        All users who are minors in the jurisdiction in which they reside
        (generally under the age of 18) must have the permission of, and be
        directly supervised by, their parent or guardian to use the Services. If
        you are a minor, you must have your parent or guardian read and agree to
        these Legal Terms prior to you using the Services.
      </Paragraph>

      <Paragraph>
        We recommend that you print a copy of these Legal Terms for your
        records.
      </Paragraph>
      <Heading id="top">TABLE OF CONTENTS</Heading>
      <Index
        scrollTo="top"
        className="fixed bottom-10 right-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-customAccent bg-background pl-0 text-primary"
      >
        <ChevronUp />
      </Index>
      <div className="flex flex-col">
        <Index scrollTo="t1">1. OUR SERVICES</Index>
        <Index scrollTo="t2">2. INTELLECTUAL PROPERTY RIGHTS</Index>
        <Index scrollTo="t3">3. USER REPRESENTATIONS</Index>
        <Index scrollTo="t4">4. USER REGISTRATION</Index>
        <Index scrollTo="t5">5. PURCHASES AND PAYMENT</Index>
        <Index scrollTo="t6">6. PROHIBITED ACTIVITIES</Index>
        <Index scrollTo="t7">7. USER GENERATED CONTRIBUTIONS</Index>
        <Index scrollTo="t8">8. CONTRIBUTION LICENCE</Index>
        <Index scrollTo="t9">9. GUIDELINES FOR REVIEWS</Index>
        <Index scrollTo="t10">10. SOCIAL MEDIA</Index>
        <Index scrollTo="t11">11. THIRD-PARTY WEBSITES AND CONTENT</Index>
        <Index scrollTo="t12">12. ADVERTISERS</Index>
        <Index scrollTo="t13">13. SERVICES MANAGEMENT</Index>
        <Index scrollTo="t14">14. PRIVACY POLICY</Index>
        <Index scrollTo="t15">15. COPYRIGHT INFRINGEMENTS</Index>
        <Index scrollTo="t16">16. TERM AND TERMINATION</Index>
        <Index scrollTo="t17">17. MODIFICATIONS AND INTERRUPTIONS</Index>
        <Index scrollTo="t18">18. GOVERNING LAW</Index>
        <Index scrollTo="t19">19. DISPUTE RESOLUTION</Index>
        <Index scrollTo="t20">20. CORRECTIONS</Index>
        <Index scrollTo="t21">21. DISCLAIMER</Index>
        <Index scrollTo="t22">22. LIMITATIONS OF LIABILITY</Index>
        <Index scrollTo="t23">23. INDEMNIFICATION</Index>
        <Index scrollTo="t24">24. USER DATA</Index>
        <Index scrollTo="t25">
          25. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES 26.
          CALIFORNIA USERS AND RESIDENTS
        </Index>
        <Index scrollTo="t26">CALIFORNIA USERS AND RESIDENTS</Index>
        <Index scrollTo="t27">27. MISCELLANEOUS</Index>
        <Index scrollTo="t28">28. CONTACT US</Index>
      </div>
      <Heading id="t1">1. OUR SERVICES</Heading>
      <Paragraph>
        The information provided when using the Services is not intended for
        distribution to or use by any person or entity in any jurisdiction or
        country where such distribution or use would be contrary to law or
        regulation or which would subject us to any registration requirement
        within such jurisdiction or country. Accordingly, those persons who
        choose to access the Services from other locations do so on their own
        initiative and are solely responsible for compliance with local laws, if
        and to the extent local laws are applicable. The Services are not
        tailored to comply with industry-specific regulations (Health Insurance
        Portability and Accountability Act (HIPAA), Federal Information Security
        Management Act (FISMA), etc.), so if your interactions would be
        subjected to such laws, you may not use the Services. You may not use
        the Services in a way that would violate the Gramm-Leach-Bliley Act
        (GLBA).
      </Paragraph>
      <Heading id="t2">
        2. INTELLECTUAL PROPERTY RIGHTS (Our intellectual property)
      </Heading>
      <Paragraph>
        We are the owner or the licensee of all intellectual property rights in
        our Services, including all source code, databases, functionality,
        software, website designs, audio, video, text, photographs, and graphics
        in the Services (collectively, the &quot;Content&quot;), as well as the
        trademarks, service marks, and logos contained therein (the
        &quot;Marks&quot;). Our Content and Marks are protected by copyright and
        trademark laws (and various other intellectual property rights and
        unfair competition laws) and treaties in the United States and around
        the world. The Content and Marks are provided in or through the Services
        &quot;AS IS&quot; for your personal, non-commercial use or internal
        business purpose only.
      </Paragraph>
      <Subheading>Your use of our Services</Subheading>
      <Paragraph>
        Subject to your compliance with these Legal Terms, including the{" "}
        <span className="font-semibold">&quot;PROHIBITED ACTIVITIES&quot;</span>{" "}
        section below, we grant you a non-exclusive, non-transferable, revocable
        licence to: access the Services; and download or print a copy of any
        portion of the Content to which you have properly gained access. solely
        for your personal, non-commercial use or internal business purpose.
        Except as set out in this section or elsewhere in our Legal Terms, no
        part of the Services and no Content or Marks may be copied, reproduced,
        aggregated, republished, uploaded, posted, publicly displayed, encoded,
        translated, transmitted, distributed, sold, licensed, or otherwise
        exploited for any commercial purpose whatsoever, without our express
        prior written permission. If you wish to make any use of the Services,
        Content, or Marks other than as set out in this section or elsewhere in
        our Legal Terms, please address your request to: support@deardegens.com.
        If we ever grant you the permission to post, reproduce, or publicly
        display any part of our Services or Content, you must identify us as the
        owners or licensors of the Services, Content, or Marks and ensure that
        any copyright or proprietary notice appears or is visible on posting,
        reproducing, or displaying our Content. We reserve all rights not
        expressly granted to you in and to the Services, Content, and Marks. Any
        breach of these Intellectual Property Rights will constitute a material
        breach of our Legal Terms and your right to use our Services will
        terminate immediately.
      </Paragraph>
      <Subheading>Your submissions and contributions</Subheading>
      <Paragraph>
        Please review this section and the{" "}
        <span className="font-semibold">&quot;PROHIBITED ACTIVITIES&quot;</span> section
        carefully prior to using our Services to understand the (a) rights you
        give us and (b) obligations you have when you post or upload any content
        through the Services. Submissions: By directly sending us any question,
        comment, suggestion, idea, feedback, or other information about the
        Services (&quot;Submissions&quot;), you agree to assign to us all
        intellectual property rights in such Submission. You agree that we shall
        own this Submission and be entitled to its unrestricted use and
        dissemination for any lawful purpose, commercial or otherwise, without
        acknowledgment or compensation to you. Contributions: The Services may
        invite you to chat, contribute to, or participate in blogs, message
        boards, online forums, and other functionality during which you may
        create, submit, post, display, transmit, publish, distribute, or
        broadcast content and materials to us or through the Services, including
        but not limited to text, writings, video, audio, photographs, music,
        graphics, comments, reviews, rating suggestions, personal information,
        or other material (&quot;Contributions&quot;). Any Submission that is
        publicly posted shall also be treated as a Contribution. You understand
        that Contributions may be viewable by other users of the Services and
        possibly through third-party websites. When you post Contributions, you
        grant us a licence (including use of your name, trademarks, and logos):
        By posting any Contributions, you grant us an unrestricted, unlimited,
        irrevocable, perpetual, non-exclusive, transferable, royalty-free,
        fully-paid, worldwide right, and licence to: use, copy, reproduce,
        distribute, sell, resell, publish, broadcast, retitle, store, publicly
        perform, publicly display, reformat, translate, excerpt (in whole or in
        part), and exploit your Contributions (including, without limitation,
        your image, name, and voice) for any purpose, commercial, advertising,
        or otherwise, to prepare derivative works of, or incorporate into other
        works, your Contributions, and to sublicence the licences granted in
        this section. Our use and distribution may occur in any media formats
        and through any media channels. This licence includes our use of your
        name, company name, and franchise name, as applicable, and any of the
        trademarks, service marks, trade names, logos, and personal and
        commercial images you provide. You are responsible for what you post or
        upload: By sending us Submissions and/or posting Contributions through
        any part of the Services or making Contributions accessible through the
        Services by linking your account through the Services to any of your
        social networking accounts, you: confirm that you have read and agree
        with our &quot;PROHIBITED ACTIVITIES&quot; and will not post, send,
        publish, upload, or transmit through the Services any Submission nor
        post any Contribution that is illegal, harassing, hateful, harmful,
        defamatory, obscene, bullying, abusive, discriminatory, threatening to
        any person or group, sexually explicit, false, inaccurate, deceitful, or
        misleading; to the extent permissible by applicable law, waive any and
        all moral rights to any such Submission and/or Contribution; warrant
        that any such Submission and/or Contributions are original to you or
        that you have the necessary rights and licences to submit such
        Submissions and/or Contributions and that you have full authority to
        grant us the above-mentioned rights in relation to your Submissions
        and/or Contributions; and warrant and represent that your Submissions
        and/or Contributions do not constitute confidential information. You are
        solely responsible for your Submissions and/or Contributions and you
        expressly agree to reimburse us for any and all losses that we may
        suffer because of your breach of (a) this section, (b) any third
        party&apos;s intellectual property rights, or (c) applicable law. We may
        remove or edit your Content: Although we have no obligation to monitor
        any Contributions, we shall have the right to remove or edit any
        Contributions at any time without notice if in our reasonable opinion we
        consider such Contributions harmful or in breach of these Legal Terms.
        If we remove or edit any such Contributions, we may also suspend or
        disable your account and report you to the authorities.
      </Paragraph>
      <Subheading>Copyright infringement</Subheading>
      <Paragraph>
        We respect the intellectual property rights of others. If you believe
        that any material available on or through the Services infringes upon
        any copyright you own or control, please immediately refer to the{" "}
        <span className="font-semibold">
          &quot;COPYRIGHT INFRINGEMENTS&quot;
        </span>{" "}
        section below.
      </Paragraph>
      <Heading id="t3">3. USER REPRESENTATIONS</Heading>
      <Paragraph>
        By using the Services, you represent and warrant that: (1) all
        registration information you submit will be true, accurate, current, and
        complete; (2) you will maintain the accuracy of such information and
        promptly update such registration information as necessary; (3) you have
        the legal capacity and you agree to comply with these Legal Terms; (4)
        you are not under the age of 13; (5) you are not a minor in the
        jurisdiction in which you reside, or if a minor, you have received
        parental permission to use the Services; (6) you will not access the
        Services through automated or non-human means, whether through a bot,
        script or otherwise; (7) you will not use the Services for any illegal
        or unauthorised purpose; and (8) your use of the Services will not
        violate any applicable law or regulation. If you provide any information
        that is untrue, inaccurate, not current, or incomplete, we have the
        right to suspend or terminate your account and refuse any and all
        current or future use of the Services (or any portion thereof).
      </Paragraph>
      <Heading id="t4">4. USER REGISTRATION</Heading>
      <Paragraph>
        You may be required to register to use the Services. You agree to keep
        your password confidential and will be responsible for all use of your
        account and password. We reserve the right to remove, reclaim, or change
        a username you select if we determine, in our sole discretion, that such
        username is inappropriate, obscene, or otherwise objectionable.
      </Paragraph>
      <Heading id="t5">5. PURCHASES AND PAYMENT</Heading>
      <Paragraph>All purchases are non-refundable.</Paragraph>
      <Paragraph>We accept the following forms of payment:</Paragraph>
      <BulletBody>
        <BulletPoint>Visa</BulletPoint>
        <BulletPoint>Mastercard</BulletPoint>
      </BulletBody>
      <Paragraph>
        You agree to provide current, complete, and accurate purchase and
        account information for all purchases made via the Services. You further
        agree to promptly update account and payment information, including
        email address, payment method, and payment card expiration date, so that
        we can complete your transactions and contact you as needed. Sales tax
        will be added to the price of purchases as deemed required by us. We may
        change prices at any time. All payments shall be in ZAR. You agree to
        pay all charges at the prices then in effect for your purchases and any
        applicable shipping fees, and you authorise us to charge your chosen
        payment provider for any such amounts upon placing your order. We
        reserve the right to correct any errors or mistakes in pricing, even if
        we have already requested or received payment. We reserve the right to
        refuse any order placed through the Services. We may, in our sole
        discretion, limit or cancel quantities purchased per person, per
        household, or per order. These restrictions may include orders placed by
        or under the same customer account, the same payment method, and/or
        orders that use the same billing or shipping address. We reserve the
        right to limit or prohibit orders that, in our sole judgement, appear to
        be placed by dealers, resellers, or distributors.
      </Paragraph>
      <Heading id="t6">6. PROHIBITED ACTIVITIES</Heading>
      <Paragraph>
        You may not access or use the Services for any purpose other than that
        for which we make the Services available. The Services may not be used
        in connection with any commercial endeavours except those that are
        specifically endorsed or approved by us. As a user of the Services, you
        agree not to:
      </Paragraph>

      <BulletBody>
        <BulletPoint>
          Systematically retrieve data or other content from the Services to
          create or compile, directly or indirectly, a collection, compilation,
          database, or directory without written permission from us.
        </BulletPoint>
        <BulletPoint>
          Trick, defraud, or mislead us and other users, especially in any
          attempt to learn sensitive account information such as user passwords.
        </BulletPoint>
        <BulletPoint>
          Circumvent, disable, or otherwise interfere with security-related
          features of the Services, including features that prevent or restrict
          the use or copying of any Content or enforce limitations on the use of
          the Services and/or the Content contained therein.
        </BulletPoint>
        <BulletPoint>
          Disparage, tarnish, or otherwise harm, in our opinion, us and/or the
          Services.
        </BulletPoint>
        <BulletPoint>
          Use any information obtained from the Services in order to harass,
          abuse, or harm another person.
        </BulletPoint>
        <BulletPoint>
          Make improper use of our support services or submit false reports of
          abuse or misconduct.
        </BulletPoint>
        <BulletPoint>
          Use the Services in a manner inconsistent with any applicable laws or
          regulations. Engage in unauthorised framing of or linking to the
          Services.
        </BulletPoint>
        <BulletPoint>
          Upload or transmit (or attempt to upload or to transmit) viruses,
          Trojan horses, or other material, including excessive use of capital
          letters and spamming (continuous posting of repetitive text), that
          interferes with any party&apos;s uninterrupted use and enjoyment of
          the Services or modifies, impairs, disrupts, alters, or interferes
          with the use, features, functions, operation, or maintenance of the
          Services.
        </BulletPoint>
        <BulletPoint>
          Engage in any automated use of the system, such as using scripts to
          send comments or messages, or using any data mining, robots, or
          similar data gathering and extraction tools.
        </BulletPoint>
        <BulletPoint>
          Delete the copyright or other proprietary rights notice from any
          Content.
        </BulletPoint>
        <BulletPoint>
          Attempt to impersonate another user or person or use the username of
          another user. Upload or transmit (or attempt to upload or to transmit)
          any material that acts as a passive or active information collection
          or transmission mechanism, including without limitation, clear
          graphics interchange formats (&quot;gifs&quot;), 1 by 1 pixels, web
          bugs, cookies, or other similar devices (sometimes referred to as
          &quot;spyware&quot; or &quot;passive collection mechanisms&quot; or
          &quot;pcms&quot;).
        </BulletPoint>
        <BulletPoint>
          Interfere with, disrupt, or create an undue burden on the Services or
          the networks or services connected to the Services.
        </BulletPoint>
        <BulletPoint>
          Harass, annoy, intimidate, or threaten any of our employees or agents
          engaged in providing any portion of the Services to you.
        </BulletPoint>
        <BulletPoint>
          Attempt to bypass any measures of the Services designed to prevent or
          restrict access to the Services, or any portion of the Services.
        </BulletPoint>
        <BulletPoint>
          Copy or adapt the Services&apos; software, including but not limited
          to Flash, PHP, HTML, JavaScript, or other code.
        </BulletPoint>
        <BulletPoint>
          Except as permitted by applicable law, decipher, decompile,
          disassemble, or reverse engineer any of the software comprising or in
          any way making up a part of the Services. Except as may be the result
          of standard search engine or Internet browser usage, use, launch,
          develop, or distribute any automated system, including without
          limitation, any spider, robot, cheat utility, scraper, or offline
          reader that accesses the Services, or use or launch any unauthorised
          script or other software.
        </BulletPoint>
        <BulletPoint>
          Use a buying agent or purchasing agent to make purchases on the
          Services.
        </BulletPoint>
        <BulletPoint>
          Make any unauthorised use of the Services, including collecting
          usernames and/or email addresses of users by electronic or other means
          for the purpose of sending unsolicited email, or creating user
          accounts by automated means or under false pretences.
        </BulletPoint>
        <BulletPoint>
          Use the Services as part of any effort to compete with us or otherwise
          use the Services and/or the Content for any revenue-generating
          endeavour or commercial enterprise. Post sexual content
        </BulletPoint>
        <BulletPoint>
          Users are strictly prohibited from utilizing foul or offensive
          language within any content posted on this platform. Such language
          includes but is not limited to derogatory, defamatory, or
          discriminatory remarks that may incite hatred or cause harm to others.
        </BulletPoint>
        <BulletPoint>
          Users are expressly prohibited from offering for sale or trade any
          items that are known or suspected to be stolen. This encompasses goods
          obtained through illegal means or without proper authorization from
          the rightful owner.
        </BulletPoint>
        <BulletPoint>
          Users are prohibited from listing or promoting any products that pose
          a significant risk to the health, safety, or well-being of
          individuals. This includes but is not limited to items such as
          weapons, explosives, counterfeit goods, and products containing
          hazardous materials.
        </BulletPoint>
        <BulletPoint>
          {" "}
          Users are strictly prohibited from advertising or selling any illegal
          substances or narcotics, including but not limited to controlled
          substances, prescription medications, and substances regulated by
          local, national, or international law.
        </BulletPoint>
        <BulletPoint>
          Users are not permitted to post content that is in direct conflict
          with established human rights conventions. This includes content that
          promotes discrimination, hate speech, violence, or any form of
          oppression based on factors such as race, ethnicity, religion, gender,
          sexual orientation, disability, or nationality.
        </BulletPoint>
        <BulletPoint>
          Users are strictly prohibited from posting or promoting any sexually
          explicit or pornographic content on this platform. This includes but
          is not limited to images, videos, text, or links that depict or
          describe explicit sexual acts, nudity, or adult-oriented material.
          Additionally, users must refrain from soliciting or engaging in any
          form of sexual activity or services through the platform. This
          prohibition aims to uphold community standards and prevent the
          dissemination of inappropriate content that may be offensive or
          harmful to users, particularly minors or vulnerable individuals.
        </BulletPoint>
        <BulletPoint>
          Users must ensure that all content and transactions conducted on this
          platform comply with relevant laws and regulations at the local,
          national, and international levels. This includes but is not limited
          to laws related to consumer protection, intellectual property rights,
          taxation, and data privacy.
        </BulletPoint>
        <BulletPoint>
          Users are encouraged to verify the legitimacy of any products or
          services offered on this platform before engaging in transactions.
          This may include conducting due diligence, requesting relevant
          documentation or certifications, and exercising caution when dealing
          with unfamiliar or suspicious listings.
        </BulletPoint>
      </BulletBody>

      <Paragraph>
        Users are encouraged to report any violations of these terms and
        conditions, including instances of offensive language, sale of stolen
        goods, promotion of harmful products, or any other prohibited
        activities. Reports can be submitted through the designated channels
        provided by the platform.
      </Paragraph>

      <Heading id="t7">7. USER GENERATED CONTRIBUTIONS</Heading>
      <Paragraph>
        The Services may invite you to chat, contribute to, or participate in
        blogs, message boards, online forums, and other functionality, and may
        provide you with the opportunity to create, submit, post, display,
        transmit, perform, publish, distribute, or broadcast content and
        materials to us or on the Services, including but not limited to text,
        writings, video, audio, photographs, graphics, comments, suggestions, or
        personal information or other material (collectively,
        &quot;Contributions&quot;). Contributions may be viewable by other users
        of the Services and through third-party websites. As such, any
        Contributions you transmit may be treated as non- confidential and
        non-proprietary. When you create or make available any Contributions,
        you thereby represent and warrant that:
      </Paragraph>

      <BulletBody>
        <BulletPoint>
          The creation, distribution, transmission, public display, or
          performance, and the accessing, downloading, or copying of your
          Contributions do not and will not infringe the proprietary rights,
          including but not limited to the copyright, patent, trademark, trade
          secret, or moral rights of any third party.
        </BulletPoint>
        <BulletPoint>
          You are the creator and owner of or have the necessary licences,
          rights, consents, releases, and permissions to use and to authorise
          us, the Services, and other users of the Services to use your
          Contributions in any manner contemplated by the Services and these
          Legal Terms.
        </BulletPoint>
        <BulletPoint>
          You have the written consent, release, and/or permission of each and
          every identifiable individual person in your Contributions to use the
          name or likeness of each and every such identifiable individual person
          to enable inclusion and use of your Contributions in any manner
          contemplated by the Services and these Legal Terms.
        </BulletPoint>
        <BulletPoint>
          Your Contributions are not false, inaccurate, or misleading.
        </BulletPoint>
        <BulletPoint>
          Your Contributions are not unsolicited or unauthorised advertising,
          promotional materials, pyramid schemes, chain letters, spam, mass
          mailings, or other forms of solicitation.
        </BulletPoint>
        <BulletPoint>
          Your Contributions are not obscene, lewd, lascivious, filthy, violent,
          harassing, libellous, slanderous, or otherwise objectionable (as
          determined by us).
        </BulletPoint>
        <BulletPoint>
          Your Contributions do not ridicule, mock, disparage, intimidate, or
          abuse anyone.
        </BulletPoint>
        <BulletPoint>
          Your Contributions are not used to harass or threaten (in the legal
          sense of those terms) any other person and to promote violence against
          a specific person or class of people. Your Contributions do not
          violate any applicable law, regulation, or rule.
        </BulletPoint>
        <BulletPoint>
          Your Contributions do not violate the privacy or publicity rights of
          any third party.
        </BulletPoint>
        <BulletPoint>
          Your Contributions do not violate any applicable law concerning child
          pornography, or otherwise intended to protect the health or well-being
          of minors.
        </BulletPoint>
        <BulletPoint>
          Your Contributions do not include any offensive comments that are
          connected to race, national origin, gender, sexual preference, or
          physical handicap.
        </BulletPoint>
        <BulletPoint>
          Your Contributions do not otherwise violate, or link to material that
          violates, any provision of these Legal Terms, or any applicable law or
          regulation.
        </BulletPoint>
        <BulletPoint>
          Any use of the Services in violation of the foregoing violates these
          Legal Terms and may result in, among other things, termination or
          suspension of your rights to use the Services.
        </BulletPoint>
      </BulletBody>

      <Heading id="t8">8. CONTRIBUTION LICENCE</Heading>
      <Paragraph>
        By posting your Contributions to any part of the Services or making
        Contributions accessible to the Services by linking your account from
        the Services to any of your social networking accounts, you
        automatically grant, and you represent and warrant that you have the
        right to grant, to us an unrestricted, unlimited, irrevocable,
        perpetual, non-exclusive, transferable, royalty-free, fully-paid,
        worldwide right, and licence to host, use, copy, reproduce, disclose,
        sell, resell, publish, broadcast, retitle, archive, store, cache,
        publicly perform, publicly display, reformat, translate, transmit,
        excerpt (in whole or in part), and distribute such Contributions
        (including, without limitation, your image and voice) for any purpose,
        commercial, advertising, or otherwise, and to prepare derivative works
        of, or incorporate into other works, such Contributions, and grant and
        authorise sublicences of the foregoing. The use and distribution may
        occur in any media formats and through any media channels. This licence
        will apply to any form, media, or technology now known or hereafter
        developed, and includes our use of your name, company name, and
        franchise name, as applicable, and any of the trademarks, service marks,
        trade names, logos, and personal and commercial images you provide. You
        waive all moral rights in your Contributions, and you warrant that moral
        rights have not otherwise been asserted in your Contributions. We do not
        assert any ownership over your Contributions. You retain full ownership
        of all of your Contributions and any intellectual property rights or
        other proprietary rights associated with your Contributions. We are not
        liable for any statements or representations in your Contributions
        provided by you in any area on the Services. You are solely responsible
        for your Contributions to the Services and you expressly agree to
        exonerate us from any and all responsibility and to refrain from any
        legal action against us regarding your Contributions. We have the right,
        in our sole and absolute discretion, (1) to edit, redact, or otherwise
        change any Contributions; (2) to re-categorise any Contributions to
        place them in more appropriate locations on the Services; and (3) to
        pre-screen or delete any Contributions at any time and for any reason,
        without notice. We have no obligation to monitor your Contributions.
      </Paragraph>

      <Heading id="t9">9. GUIDELINES FOR REVIEWS</Heading>
      <Paragraph>
        We may provide you areas on the Services to leave reviews or ratings.
        When posting a review, you must comply with the following criteria: (1)
        you should have firsthand experience with the person/entity being
        reviewed; (2) your reviews should not contain offensive profanity, or
        abusive, racist, offensive, or hateful language; (3) your reviews should
        not contain discriminatory references based on religion, race, gender,
        national origin, age, marital status, sexual orientation, or disability;
        (4) your reviews should not contain references to illegal activity; (5)
        you should not be affiliated with competitors if posting negative
        reviews; (6) you should not make any conclusions as to the legality of
        conduct; (7) you may not post any false or misleading statements; and
        (8) you may not organise a campaign encouraging others to post reviews,
        whether positive or negative. We may accept, reject, or remove reviews
        in our sole discretion. We have absolutely no obligation to screen
        reviews or to delete reviews, even if anyone considers reviews
        objectionable or inaccurate. Reviews are not endorsed by us, and do not
        necessarily represent our opinions or the views of any of our affiliates
        or partners. We do not assume liability for any review or for any
        claims, liabilities, or losses resulting from any review. By posting a
        review, you hereby grant to us a perpetual, non-exclusive, worldwide,
        royalty-free, fully paid, assignable, and sublicensable right and
        licence to reproduce, modify, translate, transmit by any means, display,
        perform, and/or distribute all content relating to review.
      </Paragraph>

      <Heading id="t10">10. SOCIAL MEDIA</Heading>
      <Paragraph>
        As part of the functionality of the Services, you may link your account
        with online accounts you have with third-party service providers (each
        such account, a &quot;Third-Party Account&quot;) by either: (1)
        providing your Third-Party Account login information through the
        Services; or (2) allowing us to access your Third-Party Account, as is
        permitted under the applicable terms and conditions that govern your use
        of each Third-Party Account. You represent and warrant that you are
        entitled to disclose your Third-Party Account login information to us
        and/or grant us access to your Third-Party Account, without breach by
        you of any of the terms and conditions that govern your use of the
        applicable Third-Party Account, and without obligating us to pay any
        fees or making us subject to any usage limitations imposed by the
        third-party service provider of the Third-Party Account. By granting us
        access to any Third-Party Accounts, you understand that (1) we may
        access, make available, and store (if applicable) any content that you
        have provided to and stored in your Third-Party Account (the
        &quot;Social Network Content&quot;) so that it is available on and
        through the Services via your account, including without limitation any
        friend lists and (2) we may submit to and receive from your Third-Party
        Account additional information to the extent you are notified when you
        link your account with the Third-Party Account. Depending on the
        Third-Party Accounts you choose and subject to the privacy settings that
        you have set in such Third-Party Accounts, personally identifiable
        information that you post to your Third-Party Accounts may be available
        on and through your account on the Services. Please note that if a
        Third-Party Account or associated service becomes unavailable or our
        access to such Third-Party Account is terminated by the third-party
        service provider, then Social Network Content may no longer be available
        on and through the Services. You will have the ability to disable the
        connection between your account on the Services and your Third-Party
        Accounts at any time.{" "}
        <span className="font-semibold">
          PLEASE NOTE THAT YOUR RELATIONSHIP WITH THE THIRD-PARTY SERVICE
          PROVIDERS ASSOCIATED WITH YOUR THIRD-PARTY ACCOUNTS IS GOVERNED SOLELY
          BY YOUR AGREEMENT(S) WITH SUCH THIRD- PARTY SERVICE PROVIDERS.
        </span>{" "}
        We make no effort to review any Social Network Content for any purpose,
        including but not limited to, for accuracy, legality, or
        non-infringement, and we are not responsible for any Social Network
        Content. You acknowledge and agree that we may access your email address
        book associated with a Third-Party Account and your contacts list stored
        on your mobile device or tablet computer solely for purposes of
        identifying and informing you of those contacts who have also registered
        to use the Services. You can deactivate the connection between the
        Services and your Third-Party Account by contacting us using the contact
        information below or through your account settings (if applicable). We
        will attempt to delete any information stored on our servers that was
        obtained through such Third-Party Account, except the username and
        profile picture that become associated with your account.
      </Paragraph>

      <Heading id="t11">11. THIRD-PARTY WEBSITES AND CONTENT</Heading>
      <Paragraph>
        The Services may contain (or you may be sent via the Site) links to
        other websites (&quot;Third-Party Websites&quot;) as well as articles,
        photographs, text, graphics, pictures, designs, music, sound, video,
        information, applications, software, and other content or items
        belonging to or originating from third parties (&quot;Third-Party
        Content&quot;). Such Third-Party Websites and Third-Party Content are
        not investigated, monitored, or checked for accuracy, appropriateness,
        or completeness by us, and we are not responsible for any Third-Party
        Websites accessed through the Services or any Third-Party Content posted
        on, available through, or installed from the Services, including the
        content, accuracy, offensiveness, opinions, reliability, privacy
        practices, or other policies of or contained in the Third-Party Websites
        or the Third-Party Content. Inclusion of, linking to, or permitting the
        use or installation of any Third-Party Websites or any Third-Party
        Content does not imply approval or endorsement thereof by us. If you
        decide to leave the Services and access the Third-Party Websites or to
        use or install any Third-Party Content, you do so at your own risk, and
        you should be aware these Legal Terms no longer govern. You should
        review the applicable terms and policies, including privacy and data
        gathering practices, of any website to which you navigate from the
        Services or relating to any applications you use or install from the
        Services. Any purchases you make through Third-Party Websites will be
        through other websites and from other companies, and we take no
        responsibility whatsoever in relation to such purchases which are
        exclusively between you and the applicable third party. You agree and
        acknowledge that we do not endorse the products or services offered on
        Third-Party Websites and you shall hold us blameless from any harm
        caused by your purchase of such products or services. Additionally, you
        shall hold us blameless from any losses sustained by you or harm caused
        to you relating to or resulting in any way from any Third-Party Content
        or any contact with Third-Party Websites.
      </Paragraph>

      <Heading id="t12">12. ADVERTISERS</Heading>
      <Paragraph>
        We allow advertisers to display their advertisements and other
        information in certain areas of the Services, such as sidebar
        advertisements or banner advertisements. We simply provide the space to
        place such advertisements, and we have no other relationship with
        advertisers.
      </Paragraph>

      <Heading id="t13">13. SERVICES MANAGEMENT</Heading>
      <Paragraph>
        We reserve the right, but not the obligation, to: (1) monitor the
        Services for violations of these Legal Terms; (2) take appropriate legal
        action against anyone who, in our sole discretion, violates the law or
        these Legal Terms, including without limitation, reporting such user to
        law enforcement authorities; (3) in our sole discretion and without
        limitation, refuse, restrict access to, limit the availability of, or
        disable (to the extent technologically feasible) any of your
        Contributions or any portion thereof; (4) in our sole discretion and
        without limitation, notice, or liability, to remove from the Services or
        otherwise disable all files and content that are excessive in size or
        are in any way burdensome to our systems; and (5) otherwise manage the
        Services in a manner designed to protect our rights and property and to
        facilitate the proper functioning of the Services.
      </Paragraph>

      <Heading id="t14">14. PRIVACY POLICY</Heading>
      <Paragraph>
        We care about data privacy and security. Please review our Privacy
        Policy:
      </Paragraph>
      <Paragraph>
        <Link
          className="text-customAccent"
          href="https://www.deardegens.com/privacypolicy"
        >
          https://www.deardegens.com/privacypolicy
        </Link>
      </Paragraph>
      <Paragraph>
        By using the Services, you agree to be bound by our Privacy Policy,
        which is incorporated into these Legal Terms. Please be advised the
        Services are hosted in the United States. If you access the Services
        from any other region of the world with laws or other requirements
        governing personal data collection, use, or disclosure that differ from
        applicable laws in the United States, then through your continued use of
        the Services, you are transferring your data to the United States, and
        you expressly consent to have your data transferred to and processed in
        the United States. Further, we do not knowingly accept, request, or
        solicit information from children or knowingly market to children.
        Therefore, in accordance with the U.S. Children&apos;s Online Privacy
        Protection Act, if we receive actual knowledge that anyone under the age
        of 13 has provided personal information to us without the requisite and
        verifiable parental consent, we will delete that information from the
        Services as quickly as is reasonably practical.
      </Paragraph>

      <Heading id="t15">15. COPYRIGHT INFRINGEMENTS</Heading>
      <Paragraph>
        We respect the intellectual property rights of others. If you believe
        that any material available on or through the Services infringes upon
        any copyright you own or control, please immediately notify us using the
        contact information provided below (a &quot;Notification&quot;). A copy
        of your Notification will be sent to the person who posted or stored the
        material addressed in the Notification. Please be advised that pursuant
        to applicable law you may be held liable for damages if you make
        material misrepresentations in a Notification. Thus, if you are not sure
        that material located on or linked to by the Services infringes your
        copyright, you should consider first contacting an attorney.
      </Paragraph>

      <Heading id="t16">16. TERM AND TERMINATION</Heading>
      <Paragraph>
        These Legal Terms shall remain in full force and effect while you use
        the Services.{" "}
        <span className="font-semibold">
          WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL TERMS, WE RESERVE
          THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY,
          DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP
          ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING
          WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR
          COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY APPLICABLE LAW OR
          REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE SERVICES
          OR DELETE YOUR ACCOUNT AND ANY CONTENT OR INFORMATION THAT YOU POSTED
          AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.
        </span>{" "}
        If we terminate or suspend your account for any reason, you are
        prohibited from registering and creating a new account under your name,
        a fake or borrowed name, or the name of any third party, even if you may
        be acting on behalf of the third party. In addition to terminating or
        suspending your account, we reserve the right to take appropriate legal
        action, including without limitation pursuing civil, criminal, and
        injunctive redress.
      </Paragraph>

      <Heading id="t17">17. MODIFICATIONS AND INTERRUPTIONS</Heading>
      <Paragraph>
        We reserve the right to change, modify, or remove the contents of the
        Services at any time or for any reason at our sole discretion without
        notice. However, we have no obligation to update any information on our
        Services. We will not be liable to you or any third party for any
        modification, price change, suspension, or discontinuance of the
        Services. We cannot guarantee the Services will be available at all
        times. We may experience hardware, software, or other problems or need
        to perform maintenance related to the Services, resulting in
        interruptions, delays, or errors. We reserve the right to change,
        revise, update, suspend, discontinue, or otherwise modify the Services
        at any time or for any reason without notice to you. You agree that we
        have no liability whatsoever for any loss, damage, or inconvenience
        caused by your inability to access or use the Services during any
        downtime or discontinuance of the Services. Nothing in these Legal Terms
        will be construed to obligate us to maintain and support the Services or
        to supply any corrections, updates, or releases in connection therewith.
      </Paragraph>

      <Heading id="t18">18. GOVERNING LAW</Heading>
      <Paragraph>
        These Legal Terms shall be governed by and defined following the laws of
        South Africa. DearDegens (Pty) Ltd and yourself irrevocably consent that
        the courts of South Africa shall have exclusive jurisdiction to resolve
        any dispute which may arise in connection with these Legal Terms.
      </Paragraph>

      <Heading id="t19">19. DISPUTE RESOLUTION Informal Negotiations</Heading>
      <Paragraph>
        To expedite resolution and control the cost of any dispute, controversy,
        or claim related to these Legal Terms (each a &quot;Dispute&quot; and
        collectively, the &quot;Disputes&quot;) brought by either you or us
        (individually, a &quot;Party&quot; and collectively, the
        &quot;Parties&quot;), the Parties agree to first attempt to negotiate
        any Dispute (except those Disputes expressly provided below) informally
        for at least thirty (30) days before initiating arbitration. Such
        informal negotiations commence upon written notice from one Party to the
        other Party. Binding Arbitration
      </Paragraph>
      <Paragraph>
        Any dispute arising out of or in connection with these Legal Terms,
        including any question regarding its existence, validity, or
        termination, shall be referred to and finally resolved by the
        International Commercial Arbitration Court under the European
        Arbitration Chamber (Belgium, Brussels, Avenue Louise, 146) according to
        the Rules of this ICAC, which, as a result of referring to it, is
        considered as the part of this clause. The number of arbitrators shall
        be six (6). The seat, or legal place, or arbitration shall be Port
        Elizabeth, South Africa. The language of the proceedings shall be
        English. The governing law of these Legal Terms shall be substantive law
        of South Africa. Restrictions
      </Paragraph>
      <Paragraph>
        The Parties agree that any arbitration shall be limited to the Dispute
        between the Parties individually. To the full extent permitted by law,
        (a) no arbitration shall be joined with any other proceeding; (b) there
        is no right or authority for any Dispute to be arbitrated on a
        class-action basis or to utilise class action procedures; and (c) there
        is no right or authority for any Dispute to be brought in a purported
        representative capacity on behalf of the general public or any other
        persons. Exceptions to Informal Negotiations and Arbitration
      </Paragraph>
      <Paragraph>
        The Parties agree that the following Disputes are not subject to the
        above provisions concerning informal negotiations binding arbitration:
        (a) any Disputes seeking to enforce or protect, or concerning the
        validity of, any of the intellectual property rights of a Party; (b) any
        Dispute related to, or arising from, allegations of theft, piracy,
        invasion of privacy, or unauthorised use; and (c) any claim for
        injunctive relief. If this provision is found to be illegal or
        unenforceable, then neither Party will elect to arbitrate any Dispute
        falling within that portion of this provision found to be illegal or
        unenforceable and such Dispute shall be decided by a court of competent
        jurisdiction within the courts listed for jurisdiction above, and the
        Parties agree to submit to the personal jurisdiction of that court.
      </Paragraph>

      <Heading id="t20">20. CORRECTIONS</Heading>
      <Paragraph>
        There may be information on the Services that contains typographical
        errors, inaccuracies, or omissions, including descriptions, pricing,
        availability, and various other information. We reserve the right to
        correct any errors, inaccuracies, or omissions and to change or update
        the information on the Services at any time, without prior notice.
      </Paragraph>

      <Heading id="t21">21. DISCLAIMER</Heading>
      <Paragraph className="font-semibold">
        THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE
        THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST
        EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED,
        IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT
        LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
        PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR
        REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SERVICES&apos;
        CONTENT OR THE CONTENT OF ANY WEBSITES OR MOBILE APPLICATIONS LINKED TO
        THE SERVICES AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY
        (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2)
        PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING
        FROM YOUR ACCESS TO AND USE OF THE SERVICES, (3) ANY UNAUTHORISED ACCESS
        TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION
        AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR
        CESSATION OF TRANSMISSION TO OR FROM THE SERVICES, (5) ANY BUGS,
        VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR
        THROUGH THE SERVICES BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR
        OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY
        KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED,
        OR OTHERWISE MADE AVAILABLE VIA THE SERVICES. WE DO NOT WARRANT,
        ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE
        ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE SERVICES, ANY
        HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE APPLICATION FEATURED IN
        ANY BANNER OR OTHER ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY
        WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY
        THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES. AS WITH THE PURCHASE OF A
        PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD
        USE YOUR BEST JUDGEMENT AND EXERCISE CAUTION WHERE APPROPRIATE.
      </Paragraph>

      <Heading id="t22">22. LIMITATIONS OF LIABILITY</Heading>
      <Paragraph className="font-semibold">
        IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO
        YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL,
        EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST
        PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR
        USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF
        SUCH DAMAGES. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN,
        OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM
        OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE AMOUNT PAID, IF ANY,
        BY YOU TO US DURING THE TWELVE (12) MONTH PERIOD PRIOR TO ANY CAUSE OF
        ACTION ARISING. CERTAIN US STATE LAWS AND INTERNATIONAL LAWS DO NOT
        ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION
        OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE
        DISCLAIMERS OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY HAVE
        ADDITIONAL RIGHTS.
      </Paragraph>

      <Heading id="t23">23. INDEMNIFICATION</Heading>
      <Paragraph>
        You agree to defend, indemnify, and hold us harmless, including our
        subsidiaries, affiliates, and all of our respective officers, agents,
        partners, and employees, from and against any loss, damage, liability,
        claim, or demand, including reasonable attorneys’ fees and expenses,
        made by any third party due to or arising out of: (1) your
        Contributions; (2) use of the Services; (3) breach of these Legal Terms;
        (4) any breach of your representations and warranties set forth in these
        Legal Terms; (5) your violation of the rights of a third party,
        including but not limited to intellectual property rights; or (6) any
        overt harmful act toward any other user of the Services with whom you
        connected via the Services. Notwithstanding the foregoing, we reserve
        the right, at your expense, to assume the exclusive defence and control
        of any matter for which you are required to indemnify us, and you agree
        to cooperate, at your expense, with our defence of such claims. We will
        use reasonable efforts to notify you of any such claim, action, or
        proceeding which is subject to this indemnification upon becoming aware
        of it.
      </Paragraph>

      <Heading id="t24">24. USER DATA</Heading>
      <Paragraph>
        We will maintain certain data that you transmit to the Services for the
        purpose of managing the performance of the Services, as well as data
        relating to your use of the Services. Although we perform regular
        routine backups of data, you are solely responsible for all data that
        you transmit or that relates to any activity you have undertaken using
        the Services. You agree that we shall have no liability to you for any
        loss or corruption of any such data, and you hereby waive any right of
        action against us arising from any such loss or corruption of such data.
      </Paragraph>
      <Heading id="t25">
        25. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES
      </Heading>
      <Paragraph>
        Visiting the Services, sending us emails, and completing online forms
        constitute electronic communications. You consent to receive electronic
        communications, and you agree that all agreements, notices, disclosures,
        and other communications we provide to you electronically, via email and
        on the Services, satisfy any legal requirement that such communication
        be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES,
        CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF
        NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY
        US OR VIA THE SERVICES. You hereby waive any rights or requirements
        under any statutes, regulations, rules, ordinances, or other laws in any
        jurisdiction which require an original signature or delivery or
        retention of non-electronic records, or to payments or the granting of
        credits by any means other than electronic means.
      </Paragraph>
      <Heading>26. CALIFORNIA USERS AND RESIDENTS</Heading>
      <Paragraph>
        If any complaint with us is not satisfactorily resolved, you can contact
        the Complaint Assistance Unit of the Division of Consumer Services of
        the California Department of Consumer Affairs in writing at 1625 North
        Market Blvd., Suite N 112, Sacramento, California 95834 or by telephone
        at (800) 952-5210 or (916) 445-1254.
      </Paragraph>
      <Heading id="t27">27. MISCELLANEOUS</Heading>
      <Paragraph>
        These Legal Terms and any policies or operating rules posted by us on
        the Services or in respect to the Services constitute the entire
        agreement and understanding between you and us. Our failure to exercise
        or enforce any right or provision of these Legal Terms shall not operate
        as a waiver of such right or provision. These Legal Terms operate to the
        fullest extent permissible by law. We may assign any or all of our
        rights and obligations to others at any time. We shall not be
        responsible or liable for any loss, damage, delay, or failure to act
        caused by any cause beyond our reasonable control. If any provision or
        part of a provision of these Legal Terms is determined to be unlawful,
        void, or unenforceable, that provision or part of the provision is
        deemed severable from these Legal Terms and does not affect the validity
        and enforceability of any remaining provisions. There is no joint
        venture, partnership, employment or agency relationship created between
        you and us as a result of these Legal Terms or use of the Services. You
        agree that these Legal Terms will not be construed against us by virtue
        of having drafted them. You hereby waive any and all defences you may
        have based on the electronic form of these Legal Terms and the lack of
        signing by the parties hereto to execute these Legal Terms.
      </Paragraph>
      <Heading id="t28">28. CONTACT US</Heading>
      <Paragraph>
        In order to resolve a complaint regarding the Services or to receive
        further information regarding use of the Services, please contact us at:
      </Paragraph>
      <Paragraph className="mb-0">DearDegens (Pty) Ltd</Paragraph>
      <Paragraph>support@deardegens.com</Paragraph>
    </div>
  )
}
