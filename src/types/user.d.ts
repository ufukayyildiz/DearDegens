export interface User {
  id: string
  admin: boolean
  name: string
  email: string
  image: string
  coolingDown: boolean
  offers: offers[]
  listingsGeneral: listingsGeneral[]
  listingQuestions: listingQuestions[]
  offerReports: offerReports[]
  listingReports: listingReports[]
  userReports: userReports[]
  notifications: notifications[]
}
