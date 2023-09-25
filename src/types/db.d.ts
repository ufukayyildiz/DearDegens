import { InferSelectModel } from "drizzle-orm";
import { listingsGeneral, notifications } from "../db/schema"

export type listingsGeneralType = InferInsertModel<typeof listingsGeneral>
export type notificationsType = InferInsertModel<typeof notifications>

