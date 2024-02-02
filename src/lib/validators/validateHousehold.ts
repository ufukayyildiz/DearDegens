import { z } from "zod"
import {
  listingTitle,
  listingBrand,
  listingCategory,
  listingDescription,
  listingImages,
  listingLocation,
  listingMeetup,
  listingModel,
  listingPrice,
} from "./validateListing"

export const validateHousehold = z.object({
  category: listingCategory,
  price: listingPrice,
  title: listingTitle,
  brand: listingBrand,
  model: listingModel,
  description: listingDescription,
  images: listingImages,
  location: listingLocation,
  meetup: listingMeetup,
})

export type HouseholdCreationRequest = z.infer<typeof validateHousehold>
