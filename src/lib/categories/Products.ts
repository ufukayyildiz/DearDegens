import { productType } from "@/src/types/subscription"

export const products: productType[] = [
  {
    id: "000",
    name: "Free",
    description: "Basic free plan for all users.",
    price: 0,
    images: 15,
    ads: 3,
    features: ["Maximum 3 listings.", "Image bucket size: 15"],
  },
  {
    id: "001",
    name: "Additional Ad",
    description: "Once off payment per single use additional listing.",
    price: 25.0,
    images: 5,
    ads: 1,
    features: [
      "One extra listing.",
      "Image bucket size: +5",
      "Can only be used once.",
    ],
  },
  {
    id: "002",
    name: "Pro Plan",
    description: "The hustler package.",
    price: 65.0,
    images: 75,
    ads: 15,
    features: ["Maximum 15 listings.", "Image bucket size: 75"],
  },
  {
    id: "003",
    name: "Business Plan",
    description: "For small business owners.",
    price: 120.0,
    images: 250,
    ads: 50,
    features: ["Maximum 50 listings.", "Image bucket size: 250"],
  },
]
