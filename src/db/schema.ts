import { relations, sql, InferInsertModel } from "drizzle-orm"
import {
  boolean,
  datetime,
  index,
  int,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
  json,
} from "drizzle-orm/mysql-core"

export const accounts = mysqlTable(
  "accounts",
  {
    id: varchar("id", { length: 255 }).primaryKey().notNull(),
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 }).notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    access_token: text("access_token"),
    expires_in: int("expires_in"),
    id_token: text("id_token"),
    refresh_token: text("refresh_token"),
    refresh_token_expires_in: int("refresh_token_expires_in"),
    scope: varchar("scope", { length: 255 }),
    token_type: varchar("token_type", { length: 255 }),
    createdAt: timestamp("createdAt").default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
    updatedAt: timestamp("updatedAt").default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow()
    .notNull(),
  },
  (account) => ({
    providerProviderAccountIdIndex: uniqueIndex(
      "accounts__provider__providerAccountId__idx"
    ).on(account.provider, account.providerAccountId),
    userIdIndex: index("accounts__userId__idx").on(account.userId),
  })
)

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}))



export const sessions = mysqlTable(
  "sessions",
  {
    id: varchar("id", { length: 255 }).primaryKey().notNull(),
    sessionToken: varchar("sessionToken", { length: 255 }).notNull(),
    userId: varchar("userId", { length: 255 }).notNull(),
    expires: datetime("expires").notNull(),
    createdAt: timestamp("createdAt").default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
    updatedAt: timestamp("updatedAt").default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow()
    .notNull(),
  },
  (session) => ({
    sessionTokenIndex: uniqueIndex("sessions__sessionToken__idx").on(
      session.sessionToken
    ),
    userIdIndex: index("sessions__userId__idx").on(session.userId),
  })
)

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}))



export const users = mysqlTable(
  "users",
  {
    id: varchar("id", { length: 255 }).primaryKey().notNull(),
    admin: boolean("admin").default(false).notNull(),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull(),
    emailVerified: timestamp("emailVerified"),
    image: varchar("image", { length: 255 }),
    createdAt: timestamp("createdAt").default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
    updatedAt: timestamp("updatedAt").default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow()
    .notNull(),
    coolingDown: boolean("coolingDown").default(false).notNull(),
  },
  (user) => ({
    emailIndex: uniqueIndex("users__email__idx").on(user.email),
  })
)

export const usersRelations = relations(users, ({ one, many }) => ({
  accounts: one(accounts),
  sessions: many(sessions),
  offers: many(offers),
  listingsGeneral: many(listingsGeneral),
  listingQuestions: many(listingQuestions),
  offerReports: many(offerReports),
  listingReports: many(listingReports),
  userReports: many(userReports),
  notifications: many(notifications),
  wishlists: many(wishlists)
}))



export const verificationTokens = mysqlTable(
  "verification_tokens",
  {
    identifier: varchar("identifier", { length: 255 }).primaryKey().notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: datetime("expires").notNull(),
    createdAt: timestamp("createdAt").default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updatedAt").default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
  },
  (verificationToken) => ({
    tokenIndex: uniqueIndex("verification_tokens__token__idx").on(
      verificationToken.token
    ),
  })
)



export const profiles = mysqlTable("profile", {
  id: varchar("id", { length: 191 }).primaryKey().notNull(),
  userId: varchar("userId", { length: 191 }).notNull(),
  name: varchar("name", { length: 191 }),
  surname: varchar("surname", { length: 191 }),
  email: varchar("email", { length: 191 }),
  contactNum: int("contactNum"),
})

export const profileRelations = relations(profiles, ({ one }) => ({
  user: one(users, {
    fields: [profiles.userId],
    references: [users.id],
  }),
}))




export const wishlists = mysqlTable("wishlist", {
  id: varchar("id", { length: 191 }).primaryKey().notNull(),
  userId: varchar("userId", { length: 191 }).notNull(),
  listingId: varchar("listingId", { length: 191 }).notNull(),
})

export const wishlistRelations = relations(wishlists, ({ one }) => ({
  user: one(users, {
    fields: [wishlists.userId],
    references: [users.id],
  }),
}))



// agreedPrice is either the initial offer or the counter offer (if it exists). A buyer cannot counter and will need to create a new offer.
// If the seller accepts, the buyer will need to confirm. A report will be automatically generated if the buyer ignores the seller after a period.
export const offers = mysqlTable("offers", {
  id: varchar("id", { length: 191 }).primaryKey().notNull(),
  listingId: varchar("listingId", { length: 191 }).notNull(),
  buyerId: varchar("buyerId", { length: 191 }).notNull(),
  sellerId: varchar("sellerId", { length: 191 }).notNull(),
  createdAt: timestamp("createdAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow()
    .notNull(),
  sellerAcceptedAt: timestamp("sellerAcceptedAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  expiresAt: datetime("expiresAt"),
  initialPrice: int("initialPrice"),
  counterPrice: int("counterPrice"),
  agreedPrice: int("agreedPrice"),
  isAcceptedSeller: boolean("isAcceptedSeller").default(false).notNull(),
  isAcceptedBuyer: boolean("isAcceptedBuyer").default(false).notNull(),
})

export const offerRelations = relations(offers, ({ one, many }) => ({
  listingId: one(listingsGeneral, {
    fields: [offers.listingId],
    references: [listingsGeneral.id],
  }),
  propertyListingId: one(listingsProperty, {
    fields: [offers.listingId],
    references: [listingsProperty.id],
  }),
  buyerId: one(users, {
    fields: [offers.buyerId],
    references: [users.id],
  }),
  offerReports: many(offerReports),
}))

export const listingQuestions = mysqlTable("listingQuestions", {
  id: varchar("id", { length: 191 }).primaryKey().notNull(),
  listingId: varchar("listingId", { length: 191 }).notNull(),
  authorId: varchar("authorId", { length: 191 }).notNull(),
  sellerId: varchar("sellerId", { length: 191 }).notNull(),
  createdAt: timestamp("createdAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  title: varchar("title", { length: 191 }).notNull(),
  body: varchar("body", { length: 191 }).notNull(),
  reply: varchar("reply", { length: 191 }).notNull(),
})

export const listingQuestionsRelations = relations(
  listingQuestions,
  ({ one }) => ({
    authorId: one(users, {
      fields: [listingQuestions.authorId],
      references: [users.id],
    }),
  })
)

export const listingsGeneral = mysqlTable("listingGeneral", {
  id: varchar("id", { length: 191 }).primaryKey().notNull(),
  authorId: varchar("authorId", { length: 191 }).notNull(),
  createdAt: timestamp("createdAt").default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp("updatedAt").default(sql`CURRENT_TIMESTAMP`),
  expirationDate: datetime("expirationDate"),
  purgeDate: datetime("purgeDate"),
  category: varchar("category", { length: 191 }),
  price: int("price"),
  brand: varchar("brand", { length: 191 }),
  model: varchar("model", { length: 191 }),
  title: varchar("title", { length: 191 }),
  description: text("description"),
  images: text("images"),
  location: varchar("location", { length: 191 }),
  meetup: varchar("meetup", { length: 191 }),
  isAvailable: boolean("isAvailable").default(true).notNull(),
},
(listingGeneral) => ({
  idIndex: uniqueIndex("listingGeneral__id__idx").on(listingGeneral.id),
})
)

export const listingsGeneralRelations = relations(
  listingsGeneral,
  ({ one, many }) => ({
    authorId: one(users, {
      fields: [listingsGeneral.authorId],
      references: [users.id],
    }),
    offers: many(offers),
    chats: many(chats),
    listingReports: many(listingReports),
  })
)


export const listingsProperty = mysqlTable("listingProperty", {
  id: varchar("id", { length: 191 }).primaryKey().notNull(),
  authorId: varchar("authorId", { length: 191 }).notNull(),
  createdAt: timestamp("createdAt").default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp("updatedAt").default(sql`CURRENT_TIMESTAMP`),
  expirationDate: datetime("expirationDate"),
  purgeDate: datetime("purgeDate"),
  category: varchar("category", { length: 191 }),
  price: int("price"),
  title: varchar("title", { length: 191 }),
  description: text("description"),
  bedroom: varchar("bedroom", { length: 191 }),
  bathroom: varchar("bathroom", { length: 191 }),
  garage: varchar("garage", { length: 191 }),
  parkingSpace: varchar("parkingSpace", { length: 191 }),
  internet: varchar("internet", { length: 191 }),
  petFriendly: boolean("petFriendly").default(false),
  availableStart: datetime("availableStart"),
  availableEnd: datetime("availableEnd"),
  images: text("images"),
  location: varchar("location", { length: 191 }),
  isAvailable: boolean("isAvailable").default(true).notNull(),
},
(listingProperty) => ({
  idIndex: uniqueIndex("listingProperty__id__idx").on(listingProperty.id),
})
)

export const listingsPropertyRelations = relations(
  listingsProperty,
  ({ one, many }) => ({
    authorId: one(users, {
      fields: [listingsProperty.authorId],
      references: [users.id],
    }),
    offers: many(offers),
    chats: many(chats),
    listingReports: many(listingReports),
  })
)



export const chats = mysqlTable("chats", {
  id: varchar("id", { length: 191 }).primaryKey().notNull(),
  listingId: varchar("listingId", { length: 191 }).notNull(),
  createdAt: timestamp("createdAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  authorId: varchar("authorId", { length: 191 }).notNull(),
  message: text("message"),
})

export const chatsRelations = relations(chats, ({ one }) => ({
  listingId: one(listingsGeneral, {
    fields: [chats.listingId],
    references: [listingsGeneral.id],
  }),
  propertyListingId: one(listingsProperty, {
    fields: [chats.listingId],
    references: [listingsProperty.id],
  }),
  sellerId: one(users, {
    fields: [chats.authorId],
    references: [users.id],
  }),
}))

export const notifications = mysqlTable("notification", {
  id: varchar("id", { length: 191 }).primaryKey().notNull(),
  userId: varchar("userId", { length: 191 }).notNull(),
  adId: text("adId"),
  createdAt: timestamp("createdAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  title: varchar("title", { length: 191 }).notNull(),
  description: varchar("description", { length: 191 }).notNull(),
  body: text("body").notNull(),
  isRead: boolean("isRead").default(false),
})

export const notificationsRelations = relations(notifications, ({ one }) => ({
  userId: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
}))

// OfferReports are system generated
// Generated when the seller has accepted but the author has not responded within a certain time period.
// The report affects userId is the authorId of the offerId
// isActive will start true, and turn false after a time period. This determines whether the report counts towards the users cooldown status.
export const offerReports = mysqlTable("offerReport", {
  id: varchar("id", { length: 191 }).primaryKey().notNull(),
  offerId: varchar("offerId", { length: 191 }).notNull(),
  userId: varchar("userId", { length: 191 }).notNull(),
  createdAt: timestamp("createdAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  title: varchar("title", { length: 191 }).notNull(),
  description: varchar("description", { length: 191 }).notNull(),
  body: text("body").notNull(),
})

export const offerReportsRelations = relations(offerReports, ({ one }) => ({
  offerId: one(offers, {
    fields: [offerReports.offerId],
    references: [offers.id],
  }),
  userId: one(users, {
    fields: [offerReports.userId],
    references: [users.id],
  }),
}))

// listingReports are user generated
export const listingReports = mysqlTable("listingReport", {
  id: varchar("id", { length: 191 }).primaryKey().notNull(),
  authorId: varchar("authorId", { length: 191 }).notNull(),
  listingId: varchar("listingId", { length: 191 }).notNull(),
  userId: varchar("userId", { length: 191 }).notNull(),
  createdAt: timestamp("createdAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  title: varchar("title", { length: 191 }).notNull(),
  description: varchar("description", { length: 191 }).notNull(),
  body: text("body").notNull(),
})

export const listingReportsRelations = relations(listingReports, ({ one }) => ({
  authorId: one(users, {
    fields: [listingReports.authorId],
    references: [users.id],
  }),
  listingId: one(listingsGeneral, {
    fields: [listingReports.listingId],
    references: [listingsGeneral.id],
  }),
  proprtyListingId: one(listingsProperty, {
    fields: [listingReports.listingId],
    references: [listingsProperty.id],
  }),
}))

export const userReports = mysqlTable("userReport", {
  id: varchar("id", { length: 191 }).primaryKey().notNull(),
  authorId: varchar("authorId", { length: 191 }).notNull(),
  userId: varchar("userId", { length: 191 }).notNull(),
  createdAt: timestamp("createdAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  title: varchar("title", { length: 191 }).notNull(),
  description: varchar("description", { length: 191 }).notNull(),
  body: text("body").notNull(),
})

export const userReportsRelations = relations(userReports, ({ one }) => ({
  authorId: one(users, {
    fields: [userReports.authorId],
    references: [users.id],
  }),
}))
