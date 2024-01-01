DROP TABLE `chats`;--> statement-breakpoint
DROP TABLE `listingQuestions`;--> statement-breakpoint
DROP TABLE `listingReport`;--> statement-breakpoint
DROP TABLE `listingProperty`;--> statement-breakpoint
DROP TABLE `offerReport`;--> statement-breakpoint
DROP TABLE `offers`;--> statement-breakpoint
DROP TABLE `profile`;--> statement-breakpoint
DROP TABLE `userReport`;--> statement-breakpoint
DROP TABLE `verification_tokens`;--> statement-breakpoint
DROP TABLE `wishlist`;--> statement-breakpoint
ALTER TABLE `listingGeneral` ADD CONSTRAINT `listingGeneral_authorId_users_id_fk` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;