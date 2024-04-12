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
  listingYear
} from "./validateListing"

export const validateVehicleListing = z.object({
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
  description: listingDescription,
  items: listingItems,
  images: listingImages,
  location: listingLocation,
  meetup: listingMeetup,
})

export type VehicleListingCreationRequest = z.infer<typeof validateVehicleListing>
