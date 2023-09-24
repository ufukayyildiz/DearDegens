import { InferSelectModel } from "drizzle-orm";
import { listingsGeneral } from "../db/schema"

export type GeneralListing = InferSelectModel<typeof listingsGeneral>

