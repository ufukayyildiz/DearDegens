ALTER TABLE `chats`
MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT (now());
--> statement-breakpoint
ALTER TABLE `chats`
MODIFY COLUMN `sellerTextTimestamp` timestamp NOT NULL DEFAULT (now());
--> statement-breakpoint
ALTER TABLE `chats`
MODIFY COLUMN `buyerTextTimestamp` timestamp NOT NULL DEFAULT (now());