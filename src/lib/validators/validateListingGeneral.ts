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
  listingMileage,
  listingTransmission,
  listingYear,
  listingFuel,
} from "./validateListing"

export const validateListing = z.object({
  tab: listingTab,
  category: listingCategory,
  subCategory: listingSubCategory,
  price: listingPrice,
  condition: listingCondition,
  title: listingTitle,
  brand: listingBrand,
  model: listingModel,
  mileage: listingMileage,
  year: listingYear,
  transmission: listingTransmission,
  fuel: listingFuel,
  description: listingDescription,
  items: listingItems,
  images: listingImages,
  location: listingLocation,
  meetup: listingMeetup,
})

export type ListingCreationRequest = z.infer<typeof validateListing>
