import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { listingsGeneral, notifications, offers } from "../db/schema"

export type listingsGeneralType = InferInsertModel<typeof listingsGeneral>
export type notificationsType = InferInsertModel<typeof notifications>
export type offerType = InferInsertModel<typeof offers>

