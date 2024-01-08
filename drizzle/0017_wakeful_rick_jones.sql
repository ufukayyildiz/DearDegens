ALTER TABLE `chats` DROP CONSTRAINT `chats_listingId_unique`;
--> statement-breakpoint
ALTER TABLE `chats` DROP CONSTRAINT `chats_authorId_unique`;
--> statement-breakpoint
ALTER TABLE `listingQuestions` DROP CONSTRAINT `listingQuestions_listingId_unique`;
--> statement-breakpoint
ALTER TABLE `listingQuestions` DROP CONSTRAINT `listingQuestions_authorId_unique`;
--> statement-breakpoint
ALTER TABLE `listingQuestions` DROP CONSTRAINT `listingQuestions_sellerId_unique`;
--> statement-breakpoint
ALTER TABLE `listingReport` DROP CONSTRAINT `listingReport_authorId_unique`;
--> statement-breakpoint
ALTER TABLE `listingReport` DROP CONSTRAINT `listingReport_listingId_unique`;
--> statement-breakpoint
ALTER TABLE `listingReport` DROP CONSTRAINT `listingReport_userId_unique`;
--> statement-breakpoint
ALTER TABLE `listingGeneral` DROP CONSTRAINT `listingGeneral_authorId_unique`;
--> statement-breakpoint
ALTER TABLE `offerReport` DROP CONSTRAINT `offerReport_offerId_unique`;
--> statement-breakpoint
ALTER TABLE `offerReport` DROP CONSTRAINT `offerReport_userId_unique`;
--> statement-breakpoint
ALTER TABLE `offers` DROP CONSTRAINT `offers_listingId_unique`;
--> statement-breakpoint
ALTER TABLE `offers` DROP CONSTRAINT `offers_buyerId_unique`;
--> statement-breakpoint
ALTER TABLE `offers` DROP CONSTRAINT `offers_sellerId_unique`;
--> statement-breakpoint
ALTER TABLE `profile` DROP CONSTRAINT `profile_userId_unique`;
--> statement-breakpoint
ALTER TABLE `profile` DROP CONSTRAINT `profile_email_unique`;
--> statement-breakpoint
ALTER TABLE `userReport` DROP CONSTRAINT `userReport_authorId_unique`;
--> statement-breakpoint
ALTER TABLE `userReport` DROP CONSTRAINT `userReport_userId_unique`;