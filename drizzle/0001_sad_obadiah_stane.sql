CREATE TABLE `users` (
	`id` varchar(191) NOT NULL,
	`admin` boolean NOT NULL DEFAULT false,
	`name` varchar(55),
	`email` varchar(255),
	`image` varchar(255),
	`coolingDown` boolean NOT NULL DEFAULT false,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
DROP TABLE `user`;--> statement-breakpoint
ALTER TABLE `notification` DROP CONSTRAINT `notification_id_unique`;--> statement-breakpoint
ALTER TABLE `profile` DROP CONSTRAINT `profile_id_unique`;--> statement-breakpoint
ALTER TABLE `chats` ADD `sellerTextTimestamp` timestamp DEFAULT (now()) NOT NULL ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `chats` ADD `buyerTextTimestamp` timestamp DEFAULT (now()) NOT NULL ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `notification` ADD `userId` varchar(191) NOT NULL;--> statement-breakpoint
ALTER TABLE `profile` ADD `userId` varchar(191) NOT NULL;--> statement-breakpoint
ALTER TABLE `notification` ADD CONSTRAINT `notification_userId_unique` UNIQUE(`userId`);--> statement-breakpoint
ALTER TABLE `profile` ADD CONSTRAINT `profile_userId_unique` UNIQUE(`userId`);