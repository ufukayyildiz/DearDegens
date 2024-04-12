import { z } from "zod"
import {
  listingTitle,
  listingBrand,
  listingTab,
  listingCategory,
  listingDescription,
  listingImages,
  listingLocation,
  listingMeetup,
  listingModel,
  listingPrice,
  listingCondition,
  listingSubCategory,
  listingItems,
} from "./validateListing"

export const validateGeneralListing = z.object({
  tab: listingTab,
  category: listingCategory,
  subCategory: listingSubCategory,
  price: listingPrice,
  condition: listingCondition,
  title: listingTitle,
  brand: listingBrand,
  model: listingModel,
  description: listingDescription,
  items: listingItems,
  images: listingImages,
  location: listingLocation,
  meetup: listingMeetup,
})

export type GeneralListingCreationRequest = z.infer<typeof validateGeneralListing>
