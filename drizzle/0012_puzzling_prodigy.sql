ALTER TABLE `listingGeneral` MODIFY COLUMN `description` text NOT NULL;--> statement-breakpoint
ALTER TABLE `listingGeneral` ADD `brand` varchar(191) NOT NULL;--> statement-breakpoint
ALTER TABLE `listingGeneral` ADD `model` varchar(191) NOT NULL;--> statement-breakpoint
ALTER TABLE `listingGeneral` ADD `images` varchar(191) NOT NULL;--> statement-breakpoint
ALTER TABLE `listingGeneral` ADD `location` varchar(191) NOT NULL;--> statement-breakpoint
ALTER TABLE `listingGeneral` ADD `meetup` varchar(191) NOT NULL;--> statement-breakpoint
ALTER TABLE `listingGeneral` ADD `isAvailable` boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE `listingGeneral` DROP COLUMN `body`;--> statement-breakpoint
ALTER TABLE `listingGeneral` DROP COLUMN `isActive`;