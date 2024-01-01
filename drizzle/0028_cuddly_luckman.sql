CREATE TABLE `offers` (
	`id` varchar(191) NOT NULL,
	`userId` varchar(191) NOT NULL,
	`adId` varchar(191) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`expirationDate` datetime,
	`purgeDate` datetime,
	`offerPrice` int,
	`counterPrice` int,
	`isAccepted` boolean DEFAULT false,
	`isConfirmed` boolean DEFAULT false,
	CONSTRAINT `offers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `verification_tokens` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` datetime NOT NULL,
	`createdAt` timestamp DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `verification_tokens_identifier` PRIMARY KEY(`identifier`),
	CONSTRAINT `verification_tokens__token__idx` UNIQUE(`token`)
);
--> statement-breakpoint
ALTER TABLE `offers` ADD CONSTRAINT `offers_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;