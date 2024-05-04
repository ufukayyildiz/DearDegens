import React from "react"
import { Heading } from "@/src/components/components-typography/Heading"
import { Paragraph } from "@/src/components/components-typography/Paragraph"
import { Subheading } from "@/src/components/components-typography/Subheading"
import { BulletBody } from "@/src/components/components-typography/BulletBody"
import { BulletPoint } from "@/src/components/components-typography/BulletPoint"
import { BulletPointNumber } from "@/src/components/components-typography/BulletNumber"

import {
  Trash2,
  MessageCircle,
  Gavel,
  FileQuestion,
  Share2,
  AlertTriangle,
  FileEdit,
  HelpCircle,
} from "lucide-react"
import { FaRegHeart } from "react-icons/fa6"

export default function UserGuide() {
  const headingDiv = "flex flex-row relative w-full h-16"
  const subHeading = "flex absolute bottom-0 left-10"
  const icons = "flex absolute bottom-[10px] left-3"

  return (
    <div className="z-20 mx-auto mb-44 w-11/12 min-w-[280px] overflow-hidden md:w-8/12">
      <h1 className="mt-10 text-xl font-bold text-primary">User Guide</h1>
      <hr className="my-2 border border-t-muted-foreground" />
      <Heading>Introduction</Heading>
      <Paragraph>
        Welcome to DearDegens, our goal is to bring the best online registery
        experience to our users by minimising non value adding interactions. In
        order to achieve this we have constructed a platform that keeps user
        interactions to a minimum up until the point where users need to, and in
        doing so make the process of purchasing and selling second hand goods
        online a more streamlined and stress free experience.
      </Paragraph>
      <Paragraph>
        So why should you use DearDegens? Well it&apos;s fairly simple. Say
        goodbye to endless{" "}
        <span className="italic">&quot;Is it available&quot;</span> messages,
        getting unreasonably low offers and/or answering the same questions
        multiple times only to be ghosted after hours of communications. Does
        this ring a bell? Do you feel the need to add disclaimers in your ad
        descriptions to ward off time wasters?
      </Paragraph>
      <Paragraph>
        In this guide we&apos;ll outline how to use our platform in the best way
        possible to mitigate the risk of running into these scenarios. This is
        done by locking users into a process whereby buyers are given enough
        information to make a well informed offer and sellers are satidfied with
        an offer before opening free communications. This can be summarised in a
        basic four step process:
      </Paragraph>
      <BulletBody>
        <BulletPointNumber>1. Create listing.</BulletPointNumber>
        <BulletPointNumber>2. Get offers.</BulletPointNumber>
        <BulletPointNumber>3. Accept the best offer.</BulletPointNumber>
        <BulletPointNumber>4. Chat interface is opened.</BulletPointNumber>
      </BulletBody>
      <Paragraph>
        We pride ourselves on putting our users first, therefore any suggestions
        on how to better improve our services is highly appreciated. If there
        are any features you&apos;d love to see us implimented, please feel free
        to contact us at support@deardegens.com
      </Paragraph>
      <Heading>Site Navigation</Heading>
      <Paragraph></Paragraph>
      <Subheading>Create Ad</Subheading>
      <Paragraph></Paragraph>
      <Subheading>My Ads</Subheading>
      <Paragraph></Paragraph>
      <Subheading>Wishlist</Subheading>
      <Paragraph></Paragraph>
      <Subheading>Profile</Subheading>
      <Paragraph></Paragraph>
      <Subheading>User Guide</Subheading>
      <Paragraph></Paragraph>
      <Subheading>Dark / Light Mode</Subheading>
      <Paragraph></Paragraph>

      {/* SELLER INTERFACE */}
      <Heading>Listing Page Interface: Seller POV</Heading>
      <Paragraph></Paragraph>
      <div className={headingDiv}>
        <Subheading className={subHeading}>
          Mark as Sold / Mark as Available:
        </Subheading>
      </div>
      <Paragraph></Paragraph>
      <div className={headingDiv}>
        <Share2 className={icons} />
        <Subheading className={subHeading}>Share Listing:</Subheading>
      </div>
      <Paragraph>
        For maximum exposure and in order to help you get your listing out
        there, we&apos;ve added share buttons to all listings that automatically
        generate a post on various social media platforms. These include
        Facebook, X and WhatsApp. Additionally, we&apos;ve included a link
        generator to help make copying the listings URL a bit easier for use
        wherever you wish.
      </Paragraph>
      <div className={headingDiv}>
        <Gavel className={icons} />
        <Subheading className={subHeading}>Offers Manager:</Subheading>
      </div>
      <Paragraph></Paragraph>
      <div className={headingDiv}>
        <FileQuestion className={icons} />
        <Subheading className={subHeading}>Queries Manager:</Subheading>
      </div>
      <Paragraph></Paragraph>
      <div className={headingDiv}>
        <FileEdit className={icons} />
        <Subheading className={subHeading}>Edit Listing:</Subheading>
      </div>
      <Paragraph></Paragraph>
      <div className={headingDiv}>
        <Trash2 className={icons} />
        <Subheading className={subHeading}>Delete Listing:</Subheading>
      </div>
      <Paragraph></Paragraph>
      <div className={headingDiv}>
        <MessageCircle className={icons} />
        <Subheading className={subHeading}>Chat Room:</Subheading>
      </div>
      <Paragraph></Paragraph>

      {/* BUYER INTERFACE */}
      <Heading>Listing Page Interface: Buyer POV</Heading>
      <Paragraph></Paragraph>
      <div className={headingDiv}>
        <Subheading className={subHeading}>Send an Offer:</Subheading>
      </div>
      <Paragraph>
        Located at the top right of the listing page, the &quot;Send an
        Offer&quot; button can be used to send the seller an offer for the
        product they&apos;ve listed. They&apos;ll then be notified of your offer
        where they can respond via the &quot;Offers Manager&quot;.{" "}
        <span className="font-semibold italic">
          NOTE: Interested buyers will be limited to sending a maximum of two
          offers per listing.
        </span>
      </Paragraph>
      <div className={headingDiv}>
        <Share2 className={icons} />
        <Subheading className={subHeading}>Share Listing:</Subheading>
      </div>
      <Paragraph>
        For maximum exposure and in order to help you get your listing out
        there, we&apos;ve added share buttons to all listings that automatically
        generate a post on various social media platforms. These include
        Facebook, X and WhatsApp. Additionally, we&apos;ve included a link
        generator to help make copying the listings URL a bit easier for use
        wherever you wish.
      </Paragraph>
      <div className={headingDiv}>
        <FaRegHeart className="absolute bottom-[10px] left-3 flex h-6 w-6" />
        <Subheading className={subHeading}>Add to Wishlist:</Subheading>
      </div>
      <Paragraph></Paragraph>
      <div className={headingDiv}>
        <Gavel className={icons} />
        <Subheading className={subHeading}>Offers Manager:</Subheading>
      </div>
      <Paragraph></Paragraph>
      <div className={headingDiv}>
        <FileQuestion className={icons} />
        <Subheading className={subHeading}>Queries Manager:</Subheading>
      </div>
      <Paragraph></Paragraph>
      <div className={headingDiv}>
        <HelpCircle className={icons} />
        <Subheading className={subHeading}>Send A Query:</Subheading>
      </div>
      <Paragraph></Paragraph>
      <div className={headingDiv}>
        <AlertTriangle className={icons} />
        <Subheading className={subHeading}>Report Listing:</Subheading>
      </div>
      <Paragraph></Paragraph>
      <div className={headingDiv}>
        <MessageCircle className={icons} />
        <Subheading className={subHeading}>Chat Room:</Subheading>
      </div>
      <Paragraph></Paragraph>
    </div>
  )
}
