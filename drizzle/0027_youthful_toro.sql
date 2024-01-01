ALTER TABLE `listingGeneral` RENAME COLUMN `isAvailable` TO `isNew`;--> statement-breakpoint
ALTER TABLE `listingGeneral` MODIFY COLUMN `isNew` boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE `listingGeneral` ADD `isUrgent` boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE `listingGeneral` ADD `isPending` boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE `listingGeneral` ADD `isHot` boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE `listingGeneral` ADD `isSold` boolean DEFAULT false;