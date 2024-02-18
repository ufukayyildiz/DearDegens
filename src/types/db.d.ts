import { InferInsertModel, InferSelectModel } from "drizzle-orm"

import {
  listings,
  notifications,
  offers,
  queries,
  wishlist,
} from "../server/db/schema"

export type listingsType = InferInsertModel<typeof listings>
export type notificationsType = InferInsertModel<typeof notifications>
export type offerType = InferInsertModel<typeof offers>
export type queryType = InferInsertModel<typeof queries>
export type wishlistType = InferInsertModel<typeof wishlist>
