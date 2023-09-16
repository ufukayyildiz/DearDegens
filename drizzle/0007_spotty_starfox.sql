ALTER TABLE `chats` DROP CONSTRAINT `chats_sellerId_unique`;--> statement-breakpoint
ALTER TABLE `chats` DROP CONSTRAINT `chats_buyerId_unique`;--> statement-breakpoint
ALTER TABLE `chats` ADD `authorId` varchar(191) NOT NULL;--> statement-breakpoint
ALTER TABLE `chats` ADD `message` text;--> statement-breakpoint
ALTER TABLE `chats` DROP COLUMN `sellerId`;--> statement-breakpoint
ALTER TABLE `chats` DROP COLUMN `sellerText`;--> statement-breakpoint
ALTER TABLE `chats` DROP COLUMN `sellerTextTimestamp`;--> statement-breakpoint
ALTER TABLE `chats` DROP COLUMN `buyerId`;--> statement-breakpoint
ALTER TABLE `chats` DROP COLUMN `buyerText`;--> statement-breakpoint
ALTER TABLE `chats` DROP COLUMN `buyerTextTimestamp`;--> statement-breakpoint
ALTER TABLE `chats` ADD CONSTRAINT `chats_authorId_unique` UNIQUE(`authorId`);