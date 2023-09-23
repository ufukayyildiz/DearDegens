ALTER TABLE `listingGeneral` MODIFY COLUMN `updatedAt` timestamp DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `listingGeneral` MODIFY COLUMN `expirationDate` datetime;--> statement-breakpoint
ALTER TABLE `listingGeneral` MODIFY COLUMN `purgeDate` datetime;--> statement-breakpoint
ALTER TABLE `listingGeneral` MODIFY COLUMN `category` varchar(191);--> statement-breakpoint
ALTER TABLE `listingGeneral` MODIFY COLUMN `price` int;--> statement-breakpoint
ALTER TABLE `listingGeneral` MODIFY COLUMN `brand` varchar(191);--> statement-breakpoint
ALTER TABLE `listingGeneral` MODIFY COLUMN `model` varchar(191);--> statement-breakpoint
ALTER TABLE `listingGeneral` MODIFY COLUMN `title` varchar(191);--> statement-breakpoint
ALTER TABLE `listingGeneral` MODIFY COLUMN `description` text;--> statement-breakpoint
ALTER TABLE `listingGeneral` MODIFY COLUMN `images` varchar(191);--> statement-breakpoint
ALTER TABLE `listingGeneral` MODIFY COLUMN `location` varchar(191);--> statement-breakpoint
ALTER TABLE `listingGeneral` MODIFY COLUMN `meetup` varchar(191);