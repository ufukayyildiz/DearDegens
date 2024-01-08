ALTER TABLE `listingGeneral`
ADD `purgeDate` datetime NOT NULL;
--> statement-breakpoint
ALTER TABLE `listingGeneral`
ADD `category` varchar(191) NOT NULL;