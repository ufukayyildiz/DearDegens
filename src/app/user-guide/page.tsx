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
    <div className="z-20 mx-auto mb-56 w-11/12 min-w-[280px] overflow-hidden md:w-8/12">
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
      <Paragraph>
        Join us on this exciting adventure and list your once-loved possessions
        that are ready for a new home..
      </Paragraph>
      <Subheading>My Ads</Subheading>
      <Paragraph>
        Monitor the status of your listed ads, and manage or access any offers
        and queries you have sent or received.
      </Paragraph>
      <Subheading>Wishlist</Subheading>
      <Paragraph>View saved listings for future referance.</Paragraph>
      <Subheading>Profile</Subheading>
      <Paragraph>
        Update your personal information and security preferences.
      </Paragraph>
      <Subheading>User Guide</Subheading>
      <Paragraph>
        A more conveniently placed link to this guide than the link located
        within the site footer.
      </Paragraph>
      <Subheading>Dark / Light Mode</Subheading>
      <Paragraph>
        To prevent arch eyes and potential blindness, we have provided a
        &quot;Dark Mode&quot; feature for those users who enjoy browsing at
        night during their &quot;me&quot; time.
      </Paragraph>

      {/* LISTING INTERFACE */}
      <Heading>Listing Page Interface</Heading>
      <Paragraph></Paragraph>
      <div className={headingDiv}>
        <div className="absolute bottom-[10px] left-3 flex h-6 w-6 rounded-full border-2 border-customAccent bg-background shadow-lg hover:bg-customAccent" />
        <Subheading className={subHeading}>
          Mark as Sold / Mark as Available:
        </Subheading>
      </div>
      <Paragraph>
        Toggle between your listing being sold or available.
      </Paragraph>
      <div className={headingDiv}>
        <div className="absolute bottom-[10px] left-3 flex h-6 w-6 rounded-full border-2 border-customAccent bg-background shadow-lg hover:bg-customAccent" />
        <Subheading className={subHeading}>Send an Offer:</Subheading>
      </div>
      <Paragraph>
        Located at the top right of the listing page, the &quot;Send an
        Offer&quot; button can be used to send the seller an offer for the
        product they&apos;ve listed. They&apos;ll then be notified of your offer
        where they can respond via the &quot;Offers Manager&quot;.{" "}
        <span className="font-semibold italic">
          NOTE: To prevent spam, interested buyers will be limited to sending a
          maximum of two offers per listing.
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
      <Paragraph>
        You like what you see, but maybe you&apos;re not yet ready make an
        offers? You can save listings to their wishlist for future referance.
      </Paragraph>
      <div className={headingDiv}>
        <Gavel className={icons} />
        <Subheading className={subHeading}>Offers Manager:</Subheading>
      </div>
      <Paragraph>
        Within the offers manager, you can see all offers sent or received for
        that listing. Once the offer process has been finalized (when a willing
        buyer accepts the final confirmation), the involved parties can complete
        the deal in the chat section.
      </Paragraph>
      <div className={headingDiv}>
        <FileQuestion className={icons} />
        <Subheading className={subHeading}>Queries Manager:</Subheading>
      </div>
      <Paragraph>
        The queries manager displays all questions sent or received for a
        listing, enabling potential buyers to ask questions and gather
        additional information. Sellers have the option to publicly display
        these questions and their answers on the listing, which can be helpful
        for other buyers with similar inquiries.
      </Paragraph>
      <div className={headingDiv}>
        <HelpCircle className={icons} />
        <Subheading className={subHeading}>Send A Query:</Subheading>
      </div>
      <Paragraph>
        As mentioned above, this feature allows interested buyers the
        oppertunity to fish for more information that the seller may have
        forgotten to include in the listings details.{" "}
        <span className="font-semibold italic">
          NOTE: To prevent spam, interested buyers will be limited to sending a
          maximum of two queries per listing.
        </span>
      </Paragraph>
      <div className={headingDiv}>
        <FileEdit className={icons} />
        <Subheading className={subHeading}>Edit Listing:</Subheading>
      </div>
      <Paragraph>
        If a seller wishes to update their listing, they can do so via the edit
        page. Please note that any updates will require the listing to undergo
        the review phase again to ensure compliance with our content policies.
      </Paragraph>
      <div className={headingDiv}>
        <Trash2 className={icons} />
        <Subheading className={subHeading}>Delete Listing:</Subheading>
      </div>
      <Paragraph>
        Want it gone? Then make it so. Deleting your listing will permanantly
        delete all content (but not including images in your image bucket) as
        well as any offers and queries recieved for that listing.
      </Paragraph>
      <div className={headingDiv}>
        <MessageCircle className={icons} />
        <Subheading className={subHeading}>Chat Room:</Subheading>
      </div>
      <Paragraph>
        The chatroom is where users can connect after a deal has entered the
        final confirmation phase, users are encouraged to use the chat section
        solely for exchanging contact details.
      </Paragraph>

      <Paragraph></Paragraph>

      <div className={headingDiv}>
        <AlertTriangle className={icons} />
        <Subheading className={subHeading}>Report Listing:</Subheading>
      </div>
      <Paragraph>
        If you come across a listing that you feel violates our terms of service
        or content policies, then please feel free to report the listing to us
        via this feature. You will be asked to elaborate on the reason for your
        concern, after which an email will be sent to our support team who will
        then investigate the listing in question.
      </Paragraph>
    </div>
  )
}
