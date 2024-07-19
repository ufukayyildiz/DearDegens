import { listingsType } from "@/src/types/db"
import React from "react"
import MintCarousel from "../pageMint/MintCarousel"
import DegenAdminAdCardActions from "./DegenAdminAdCardActions"
import PlaceholderImages from "../placeholdersEmptyState/PlaceholderImages"

interface DegenAdminAdCardProps {
  listing: listingsType
}

export default function DegenAdminAdCard({ listing }: DegenAdminAdCardProps) {
  return (
    <div className="relative mx-auto w-11/12">
      <DegenAdminAdCardActions listing={listing} />
      <div className="relative flex flex-col md:flex-row">
        <div className="w-48 md:w-72">
          {/* @ts-expect-error Server Component */}
          <MintCarousel images={listing.images} />
          <PlaceholderImages images={listing.images} />
        </div>
        <div className="mt-5 flex w-full flex-col gap-2 text-xs md:ml-10 md:mt-0">
          <div className="flex flex-row">
            <p className="mr-2 font-bold italic text-muted-foreground">
              Title:
            </p>
            <p>{listing.title}</p>
          </div>
          <div className="flex flex-row">
            <p className="mr-2 font-bold italic text-muted-foreground">
              Brand:
            </p>
            <p>{listing.brand}</p>
          </div>
          <div className="flex flex-row">
            <p className="mr-2 font-bold italic text-muted-foreground">
              Model:
            </p>
            <p>{listing.model}</p>
          </div>
          <div className="flex flex-col">
            <p className="mr-2 font-bold italic text-muted-foreground">
              Description:
            </p>
            <p>{listing.description}</p>
          </div>
        </div>
      </div>
      <hr className="mx-auto my-5 border border-t-muted" />
    </div>
  )
}
