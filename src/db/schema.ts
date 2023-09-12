import { boolean, mysqlTable, varchar, text, int, timestamp, datetime } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

export const users = mysqlTable('user', {
  id: varchar('id', { length: 191 }).primaryKey().notNull(),
  admin: boolean('admin').default(false).notNull(),
  name: varchar('name', { length: 55 }),
  email: varchar('email', { length: 255 }).unique(),
  image: varchar('image', { length: 255 }),
  coolingDown: boolean('coolingDown').default(false).notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
  offers: many(offers),
  listingsGeneral: many(listingsGeneral),
  listingQuestions: many(listingQuestions),
  offerReports: many(offerReports),
  listingReports: many(listingReports),
  userReports: many(userReports),
  notifications: many(notifications),
}))




export const profiles = mysqlTable('profile', {
  id: varchar('id', { length: 191 }).primaryKey().notNull(),
  userId: varchar('id', { length: 191 }).unique().notNull(),
  name: varchar('name', { length: 191 }),
  surname: varchar('surname', { length: 191 }),
  email: varchar('email', { length: 191 }).unique(),
  contactNum: int('contactNum'),
})

export const profileRelations = relations(profiles, ({ one }) => ({
  user: one(users, {
    fields: [profiles.userId],
    references: [users.id]
  })
}))




// agreedPrice is either the initial offer or the counter offer (if it exists). A buyer cannot counter and will need to create a new offer.
// If the seller accepts, the buyer will need to confirm. A report will be automatically generated if the buyer ignores the seller after a period.
export const offers = mysqlTable('offers', {
  id: varchar('id', { length: 191 }).primaryKey().notNull(),
  listingId: varchar('listingId', { length: 191 }).unique().notNull(),
  buyerId: varchar('buyerId', { length: 191 }).unique().notNull(),
  sellerId: varchar('sellerId', { length: 191 }).unique().notNull(),
  createdAt: timestamp("createdAt").defaultNow().onUpdateNow().notNull(),
  sellerAcceptedAt: timestamp("sellerAcceptedAt").defaultNow().onUpdateNow(),
  expiresAt: datetime('expiresAt'),
  initialPrice: int('initialPrice'),
  counterPrice: int('counterPrice'),
  agreedPrice: int('agreedPrice'),
  isAcceptedSeller: boolean('isAcceptedSeller').default(false).notNull(),
  isAcceptedBuyer: boolean('isAcceptedBuyer').default(false).notNull(),
})

export const offerRelations = relations(offers, ({ one, many }) => ({
  listingId: one(listingsGeneral, {
    fields: [offers.listingId],
    references: [listingsGeneral.id]
  }),
  buyerId: one(users, {
    fields: [offers.buyerId],
    references: [users.id]
  }),
  sellerId: one(users, {
    fields: [offers.sellerId],
    references: [users.id]
  }),
  offerReports: many(offerReports)
}))




export const listingQuestions = mysqlTable('listingQuestions', {
  id: varchar('id', { length: 191 }).primaryKey().notNull(),
  listingId: varchar('listingId', { length: 191 }).unique().notNull(),
  authorId: varchar('authorId', { length: 191 }).unique().notNull(),
  sellerId: varchar('sellerId', { length: 191 }).unique().notNull(),
  createdAt: timestamp("createdAt").defaultNow().onUpdateNow().notNull(),
  title: varchar('title', { length: 191 }).notNull(),
  body: varchar('body', { length: 191 }).notNull(),
  reply: varchar('reply', { length: 191 }).notNull(),
})

export const listingQuestionsRelations = relations(listingQuestions, ({ one }) => ({
  authorId: one(users, {
    fields: [listingQuestions.authorId],
    references: [users.id]
  }),
  sellerId: one(users, {
    fields: [listingQuestions.sellerId],
    references: [users.id]
  })
}))




export const listingsGeneral = mysqlTable('listingGeneral', {
  id: varchar('id', { length: 191 }).primaryKey().notNull(),
  authorId: varchar('authorId', { length: 191 }).unique().notNull(),
  createdAt: timestamp("createdAt").defaultNow().onUpdateNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  expirationDate: datetime('expirationDate').notNull(),
  purgeDate: datetime('expirationDate').notNull(),
  price: int("price").notNull(),
  title: varchar('title', { length: 191 }).notNull(),
  description: varchar('description', { length: 191 }).notNull(),
  body: text('body').notNull(),
  imageOne: varchar('description', { length: 191 }).notNull(),
  categoryTierOne: varchar('description', { length: 191 }).notNull(),
  isActive: boolean('isActive').default(true).notNull(),
  isSold: boolean('isSold').default(false), 
})

export const listingsGeneralRelations = relations(listingsGeneral, ({ one, many }) => ({
  authorId: one(users, {
    fields: [listingsGeneral.authorId],
    references: [users.id]
  }),
  offers: many(offers),
  chats: many(chats),
  listingReports: many(listingReports)
}))




export const chats = mysqlTable('chats', {
  id: varchar('id', { length: 191 }).primaryKey().notNull(),
  listingId: varchar('listingId', { length: 191 }).unique().notNull(),
  createdAt: timestamp("createdAt").defaultNow().onUpdateNow().notNull(),
  sellerId: varchar('sellerId', { length: 191 }).unique().notNull(),
  sellerText: text('sellerText'),
  sellerTextTimestamp: timestamp("createdAt").defaultNow().onUpdateNow().notNull(),
  buyerId: varchar('buyerId', { length: 191 }).unique().notNull(),
  buyerText: text('buyerText'),
  buyerTextTimestamp: timestamp("createdAt").defaultNow().onUpdateNow().notNull(),
})

export const chatsRelations = relations(chats, ({ one }) => ({
  listingId: one(listingsGeneral, {
    fields: [chats.listingId],
    references: [listingsGeneral.id]
  }),
  sellerId: one(users, {
    fields: [chats.sellerId],
    references: [users.id]
  }),
  buyerId: one(users, {
    fields: [chats.buyerId],
    references: [users.id]
  })
}))




export const notifications = mysqlTable('notification', {
  id: varchar('id', { length: 191 }).primaryKey().notNull(),
  userId: varchar('id', { length: 191 }).unique().notNull(),
  createdAt: timestamp("createdAt").defaultNow().onUpdateNow().notNull(),
  title: varchar('title', { length: 191 }).notNull(),
  description: varchar('description', { length: 191 }).notNull(),
  body: text('body').notNull(),
  isRead: boolean('isRead').default(false),
})

export const notificationsRelations = relations(notifications, ({ one }) => ({
  userId: one(users, {
    fields: [notifications.userId],
    references: [users.id]
  })
}))




// OfferReports are system generated
// Generated when the seller has accepted but the author has not responded within a certain time period.
// The report affects userId is the authorId of the offerId
// isActive will start true, and turn false after a time period. This determines whether the report counts towards the users cooldown status. 
export const offerReports = mysqlTable('offerReport', {
  id: varchar('id', { length: 191 }).primaryKey().notNull(),
  offerId: varchar('offerId', { length: 191 }).unique().notNull(),
  userId: varchar('userId', { length: 191 }).unique().notNull(),
  createdAt: timestamp("createdAt").defaultNow().onUpdateNow().notNull(),
  isActive: boolean('isActive').default(true).notNull(),
  title: varchar('title', { length: 191 }).notNull(),
  description: varchar('description', { length: 191 }).notNull(),
  body: text('body').notNull(),
})

export const offerReportsRelations = relations(offerReports, ({ one }) => ({
  offerId: one(offers, {
    fields: [offerReports.offerId],
    references: [offers.id]
  }),
  userId: one(users, {
    fields: [offerReports.userId],
    references: [users.id]
  })
}))



// listingReports are user generated
export const listingReports = mysqlTable('listingReport', {
  id: varchar('id', { length: 191 }).primaryKey().notNull(),
  authorId: varchar('authorId', { length: 191 }).unique().notNull(),
  listingId: varchar('listingId', { length: 191 }).unique().notNull(),
  userId: varchar('userId', { length: 191 }).unique().notNull(),
  createdAt: timestamp("createdAt").defaultNow().onUpdateNow().notNull(),
  isActive: boolean('isActive').default(true).notNull(),
  title: varchar('title', { length: 191 }).notNull(),
  description: varchar('description', { length: 191 }).notNull(),
  body: text('body').notNull(),
})

export const listingReportsRelations = relations(listingReports, ({ one }) => ({
  authorId: one(users, {
    fields: [listingReports.authorId],
    references: [users.id]
  }),
  offerId: one(listingsGeneral, {
    fields: [listingReports.listingId],
    references: [listingsGeneral.id]
  }),
  userId: one(users, {
    fields: [listingReports.userId],
    references: [users.id]
  })
}))




export const userReports = mysqlTable('userReport', {
  id: varchar('id', { length: 191 }).primaryKey().notNull(),
  authorId: varchar('authorId', { length: 191 }).unique().notNull(),
  userId: varchar('userId', { length: 191 }).unique().notNull(),
  createdAt: timestamp("createdAt").defaultNow().onUpdateNow().notNull(),
  isActive: boolean('isActive').default(true).notNull(),
  title: varchar('title', { length: 191 }).notNull(),
  description: varchar('description', { length: 191 }).notNull(),
  body: text('body').notNull(),
})

export const userReportsRelations = relations(userReports, ({ one }) => ({
  authorId: one(users, {
    fields: [userReports.authorId],
    references: [users.id]
  }),
  userId: one(users, {
    fields: [userReports.userId],
    references: [users.id]
  })
}))

