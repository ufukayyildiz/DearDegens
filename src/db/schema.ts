import { boolean, mysqlTable, serial, varchar, int } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";


export const user = mysqlTable('user', {
  id: serial('id').primaryKey(),
  admin: boolean('admin').default(false),
  name: varchar('name', { length: 55 }),
  email: varchar('email', { length: 255 }).unique(),
  image: varchar('image', { length: 255 }),
})

export const usersRelations = relations(user, ({ many }) => ({
  offer: many(offer),
  listingGeneral: many(listingGeneral),
  offerReport: many(offerReport),
  listingReport: many(listingReport),
  cooldownStatus: many(cooldownStatus),
  cooldownHistory: many(cooldownHistory),
  notification: many(notification),
}))

export const profile = mysqlTable('profile', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 55 }),
  surname: varchar('surname', { length: 55 }),
  email: varchar('email', { length: 255 }).unique(),
  contactNum: int('contactNum'),
})

export const profileRelations = relations(profile, ({ one }) => ({
  user: one(user)
}))

// sellingPrice is either the initial offer or the counter offer (if it exists). A buyer cannot counter and will need to create a new offer.
// If the seller accepts, the buyer will need to confirm. A report will be automatically generated if the buyer ignores the seller after a period.
export const offer = mysqlTable('offer', {
  // - id
  // - listingId
  // - authorId
  // - sellerId
  // - createdAt
  // - initialAmount
  // - counterAmount
  // - sellingPrice
  // - isAcceptedSeller
  // - isAcceptedAuthor
  // - offerReports[]
})

export const listingGeneral = mysqlTable('listingGeneral', {
  // - id
  // - authorId
  // - createdAt
  // - updatedAt
  // - expirationDate
  // - purgeDate
  // - price
  // - title
  // - description
  // - body
  // - imageOne…
  // - categoryTierOne…
  // - offers[]
  // - chats[]
  // - isActive
  // - isSold
  // - listingReports[]
})

export const notification = mysqlTable('notification', {
  // - id
  // - userId
  // - createdAt
  // - title
  // - description
  // - body
  // - isRead
})

// OfferReports are system generated
// Generated when the seller has accepted but the author has not responded within a certain time period.
// The report affects userId is the authorId of the offerId
// isActive will start true, and turn false after a time period. This determines whether the report counts towards the users cooldown status. 
export const offerReport = mysqlTable('offerReport', {
  // - id
  // - offerId
  // - userId
  // - createdAt
  // - isActive
  // - title
  // - description
})

// listingReports are user generated
export const listingReport = mysqlTable('listingReport', {
  // - id
  // - listingId
  // - authorId
  // - sellerId
  // - createdAt
  // - isActive
  // - title
  // - type
  // - description
})

export const userReport = mysqlTable('userReport', {
  // - id
  // - userId
  // - authorId
  // - createdAt
  // - isActive
  // - title
  // - type
  // - description
})

export const cooldownStatus = mysqlTable('cooldownStatus', {

})

export const cooldownHistory = mysqlTable('cooldownHistory', {
  
})


// cooldownPeriod: ?? needed ??

// - id
// - userId
// - createdAt
// - expiresAt
// - isActive