
--> statement-breakpoint
CREATE TABLE `wishlist` (
	`id` varchar(191) NOT NULL,
	`userId` varchar(191) NOT NULL,
	`wishlistItemId` varchar(191),
	CONSTRAINT `wishlist_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `wishlistItem` (
	`id` varchar(191) NOT NULL,
	`adId` varchar(191) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `wishlistItem_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `imageBucket` text DEFAULT ('');--> statement-breakpoint
ALTER TABLE `listings` ADD `subCategory` varchar(191);--> statement-breakpoint
ALTER TABLE `listings` ADD `items` text;--> statement-breakpoint
ALTER TABLE `users` ADD `wishlist` varchar(191);--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_wishlist_wishlist_id_fk` FOREIGN KEY (`wishlist`) REFERENCES `wishlist`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `offersList` ADD CONSTRAINT `offersList_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `offersList` ADD CONSTRAINT `offersList_adId_listings_id_fk` FOREIGN KEY (`adId`) REFERENCES `listings`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `offersList` ADD CONSTRAINT `offersList_itemId_listings_id_fk` FOREIGN KEY (`itemId`) REFERENCES `listings`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `wishlist` ADD CONSTRAINT `wishlist_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `wishlist` ADD CONSTRAINT `wishlist_wishlistItemId_wishlistItem_id_fk` FOREIGN KEY (`wishlistItemId`) REFERENCES `wishlistItem`(`id`) ON DELETE no action ON UPDATE no action;