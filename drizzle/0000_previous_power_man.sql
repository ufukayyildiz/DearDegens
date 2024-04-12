CREATE TABLE IF NOT EXISTS "accounts" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"providerAccountId" varchar(255) NOT NULL,
	"access_token" text,
	"expires_in" integer,
	"id_token" text,
	"refresh_token" text,
	"refresh_token_expires_in" integer,
	"scope" varchar(255),
	"token_type" varchar(255),
	"createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chatRoom" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"adId" varchar(191) NOT NULL,
	"userId" varchar(191) NOT NULL,
	"sellerId" varchar(191) NOT NULL,
	"createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "listingReports" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"userId" varchar(191) NOT NULL,
	"adId" varchar(191) NOT NULL,
	"sellerId" varchar(191) NOT NULL,
	"createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"infraction" varchar(191) NOT NULL,
	"description" text,
	"adFlagged" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "listings" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"authorId" varchar(191) NOT NULL,
	"createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP,
	"expirationDate" timestamp,
	"purgeDate" timestamp,
	"tab" varchar(191),
	"category" varchar(191),
	"subCategory" varchar(191),
	"price" integer,
	"title" varchar(191),
	"brand" varchar(191),
	"model" varchar(191),
	"description" text,
	"items" text,
	"mileage" integer,
	"year" integer,
	"transmission" varchar(191),
	"images" text,
	"condition" varchar(191),
	"location" varchar(191),
	"meetup" varchar(191),
	"isNew" boolean DEFAULT true,
	"isUrgent" boolean DEFAULT false,
	"isPending" boolean DEFAULT false,
	"isHot" boolean DEFAULT false,
	"isSold" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "messages" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"roomId" varchar(191) NOT NULL,
	"userId" varchar(191) NOT NULL,
	"userName" varchar(191) NOT NULL,
	"message" text,
	"createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notifications" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"userId" varchar(191) NOT NULL,
	"adId" text,
	"adUrl" text,
	"createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"title" varchar(191) NOT NULL,
	"description" varchar(191) NOT NULL,
	"body" text NOT NULL,
	"isRead" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "offers" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"userId" varchar(191) NOT NULL,
	"userName" varchar(191),
	"adId" varchar(191) NOT NULL,
	"sellerId" varchar(191),
	"adTitle" varchar(191),
	"createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"expirationDate" timestamp,
	"purgeDate" timestamp,
	"askPrice" integer,
	"offerPrice" integer,
	"counterPrice" integer,
	"isCountered" boolean DEFAULT false,
	"isDeclined" boolean DEFAULT false,
	"isAccepted" boolean DEFAULT false,
	"isConfirmed" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "offersList" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"userId" varchar(191) NOT NULL,
	"userName" varchar(191),
	"adId" varchar(191) NOT NULL,
	"itemId" varchar(191) NOT NULL,
	"sellerId" varchar(191),
	"name" varchar(191),
	"createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"expirationDate" timestamp,
	"purgeDate" timestamp,
	"askPrice" integer,
	"offerPrice" integer,
	"counterPrice" integer,
	"isCountered" boolean DEFAULT false,
	"isDeclined" boolean DEFAULT false,
	"isAccepted" boolean DEFAULT false,
	"isConfirmed" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "queries" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"userId" varchar(191) NOT NULL,
	"userName" varchar(191),
	"adId" varchar(191) NOT NULL,
	"sellerId" varchar(191),
	"adTitle" varchar(191),
	"createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"expirationDate" timestamp,
	"purgeDate" timestamp,
	"query" varchar(191),
	"reply" varchar(191),
	"isAnswered" boolean DEFAULT false,
	"isPublic" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"sessionToken" varchar(255) NOT NULL,
	"userId" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL,
	"createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"admin" boolean DEFAULT false NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"emailVerified" timestamp,
	"image" varchar(255),
	"imageBucket" text DEFAULT '',
	"wishlist" varchar(191),
	"createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"coolingDown" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verification_tokens" (
	"identifier" varchar(255) PRIMARY KEY NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL,
	"createdAt" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wishlist" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"userId" varchar(191) NOT NULL,
	"wishlistItem" varchar(191)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wishlistItem" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"adId" varchar(191) NOT NULL,
	"wishlistId" varchar(191),
	"createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "accounts__provider__providerAccountId__idx" ON "accounts" ("provider","providerAccountId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "accounts__userId__idx" ON "accounts" ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "idx_chatRoom_id" ON "chatRoom" ("id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "listingReports_id_idx" ON "listingReports" ("id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "listings__id__idx" ON "listings" ("id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "idx_messages_id" ON "messages" ("id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "sessions__sessionToken__idx" ON "sessions" ("sessionToken");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sessions__userId__idx" ON "sessions" ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "users__email__idx" ON "users" ("email");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "verification_tokens__token__idx" ON "verification_tokens" ("token");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "idx_wishlist_id" ON "wishlist" ("id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "idx_wishlistItem_id" ON "wishlistItem" ("id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chatRoom" ADD CONSTRAINT "chatRoom_adId_listings_id_fk" FOREIGN KEY ("adId") REFERENCES "listings"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chatRoom" ADD CONSTRAINT "chatRoom_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chatRoom" ADD CONSTRAINT "chatRoom_sellerId_users_id_fk" FOREIGN KEY ("sellerId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "listingReports" ADD CONSTRAINT "listingReports_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "listingReports" ADD CONSTRAINT "listingReports_adId_listings_id_fk" FOREIGN KEY ("adId") REFERENCES "listings"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "listingReports" ADD CONSTRAINT "listingReports_sellerId_users_id_fk" FOREIGN KEY ("sellerId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "listings" ADD CONSTRAINT "listings_authorId_users_id_fk" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_roomId_chatRoom_id_fk" FOREIGN KEY ("roomId") REFERENCES "chatRoom"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "offers" ADD CONSTRAINT "offers_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "offers" ADD CONSTRAINT "offers_adId_listings_id_fk" FOREIGN KEY ("adId") REFERENCES "listings"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "offersList" ADD CONSTRAINT "offersList_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "offersList" ADD CONSTRAINT "offersList_adId_listings_id_fk" FOREIGN KEY ("adId") REFERENCES "listings"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "offersList" ADD CONSTRAINT "offersList_itemId_listings_id_fk" FOREIGN KEY ("itemId") REFERENCES "listings"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "queries" ADD CONSTRAINT "queries_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "queries" ADD CONSTRAINT "queries_adId_listings_id_fk" FOREIGN KEY ("adId") REFERENCES "listings"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_wishlist_wishlist_id_fk" FOREIGN KEY ("wishlist") REFERENCES "wishlist"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_wishlistItem_wishlistItem_id_fk" FOREIGN KEY ("wishlistItem") REFERENCES "wishlistItem"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
