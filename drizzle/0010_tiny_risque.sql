ALTER TABLE `accounts`
MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP;
--> statement-breakpoint
ALTER TABLE `accounts`
MODIFY COLUMN `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
--> statement-breakpoint
ALTER TABLE `sessions`
ADD `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL;
--> statement-breakpoint
ALTER TABLE `sessions`
ADD `updatedAt` timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP;
--> statement-breakpoint
ALTER TABLE `users`
ADD `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL;
--> statement-breakpoint
ALTER TABLE `users`
ADD `updatedAt` timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP;
--> statement-breakpoint
ALTER TABLE `sessions` DROP COLUMN `created_at`;
--> statement-breakpoint
ALTER TABLE `sessions` DROP COLUMN `updated_at`;
--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `created_at`;
--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `updated_at`;