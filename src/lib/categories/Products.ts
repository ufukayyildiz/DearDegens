import { subscriptionsType } from "@/src/types/subscription"

export const products: subscriptionsType[] = [
  {
    id: "000",
    name: "Free",
    description: "Basic free plan for all users.",
    price: 0,
    images: 10,
    ads: 2,
    features: ["Maximum 2 listings.", "Image bucket size: 10"],
  },
  {
    id: "001",
    name: "Once off",
    description: "Once off payment per additional listing.",
    price: 25,
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
    price: 65,
    images: 50,
    ads: 10,
    features: ["Maximum 10 listings.", "Image bucket size: 50"],
  },
  {
    id: "003",
    name: "Business Plan",
    description: "For small business owners.",
    price: 120,
    images: 150,
    ads: 30,
    features: ["Maximum 30 listings.", "Image bucket size: 150"],
  },
]
