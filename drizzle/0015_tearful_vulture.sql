ALTER TABLE `verification_tokens` ADD `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `verification_tokens` ADD `updatedAt` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `verification_tokens` DROP COLUMN `created_at`;--> statement-breakpoint
ALTER TABLE `verification_tokens` DROP COLUMN `updated_at`;