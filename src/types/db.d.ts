import { InferInsertModel, InferSelectModel } from "drizzle-orm"

import { queries, notifications, offers, listings } from "../server/db/schema"

export type listingsType = InferInsertModel<typeof listings>
export type notificationsType = InferInsertModel<typeof notifications>
export type offerType = InferInsertModel<typeof offers>
export type queryType = InferInsertModel<typeof queries>
