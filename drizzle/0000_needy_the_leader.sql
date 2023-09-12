CREATE TABLE `chats` (
	`id` varchar(191) NOT NULL,
	`listingId` varchar(191) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`sellerId` varchar(191) NOT NULL,
	`sellerText` text,
	`buyerId` varchar(191) NOT NULL,
	`buyerText` text,
	CONSTRAINT `chats_id` PRIMARY KEY(`id`),
	CONSTRAINT `chats_listingId_unique` UNIQUE(`listingId`),
	CONSTRAINT `chats_sellerId_unique` UNIQUE(`sellerId`),
	CONSTRAINT `chats_buyerId_unique` UNIQUE(`buyerId`)
);
--> statement-breakpoint
CREATE TABLE `listingQuestions` (
	`id` varchar(191) NOT NULL,
	`listingId` varchar(191) NOT NULL,
	`authorId` varchar(191) NOT NULL,
	`sellerId` varchar(191) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`title` varchar(191) NOT NULL,
	`body` varchar(191) NOT NULL,
	`reply` varchar(191) NOT NULL,
	CONSTRAINT `listingQuestions_id` PRIMARY KEY(`id`),
	CONSTRAINT `listingQuestions_listingId_unique` UNIQUE(`listingId`),
	CONSTRAINT `listingQuestions_authorId_unique` UNIQUE(`authorId`),
	CONSTRAINT `listingQuestions_sellerId_unique` UNIQUE(`sellerId`)
);
--> statement-breakpoint
CREATE TABLE `listingReport` (
	`id` varchar(191) NOT NULL,
	`authorId` varchar(191) NOT NULL,
	`listingId` varchar(191) NOT NULL,
	`userId` varchar(191) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`isActive` boolean NOT NULL DEFAULT true,
	`title` varchar(191) NOT NULL,
	`description` varchar(191) NOT NULL,
	`body` text NOT NULL,
	CONSTRAINT `listingReport_id` PRIMARY KEY(`id`),
	CONSTRAINT `listingReport_authorId_unique` UNIQUE(`authorId`),
	CONSTRAINT `listingReport_listingId_unique` UNIQUE(`listingId`),
	CONSTRAINT `listingReport_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `listingGeneral` (
	`id` varchar(191) NOT NULL,
	`authorId` varchar(191) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`expirationDate` datetime NOT NULL,
	`price` int NOT NULL,
	`title` varchar(191) NOT NULL,
	`description` varchar(191) NOT NULL,
	`body` text NOT NULL,
	`isActive` boolean NOT NULL DEFAULT true,
	`isSold` boolean DEFAULT false,
	CONSTRAINT `listingGeneral_id` PRIMARY KEY(`id`),
	CONSTRAINT `listingGeneral_authorId_unique` UNIQUE(`authorId`)
);
--> statement-breakpoint
CREATE TABLE `notification` (
	`id` varchar(191) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`title` varchar(191) NOT NULL,
	`description` varchar(191) NOT NULL,
	`body` text NOT NULL,
	`isRead` boolean DEFAULT false,
	CONSTRAINT `notification_id` PRIMARY KEY(`id`),
	CONSTRAINT `notification_id_unique` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `offerReport` (
	`id` varchar(191) NOT NULL,
	`offerId` varchar(191) NOT NULL,
	`userId` varchar(191) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`isActive` boolean NOT NULL DEFAULT true,
	`title` varchar(191) NOT NULL,
	`description` varchar(191) NOT NULL,
	`body` text NOT NULL,
	CONSTRAINT `offerReport_id` PRIMARY KEY(`id`),
	CONSTRAINT `offerReport_offerId_unique` UNIQUE(`offerId`),
	CONSTRAINT `offerReport_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `offers` (
	`id` varchar(191) NOT NULL,
	`listingId` varchar(191) NOT NULL,
	`buyerId` varchar(191) NOT NULL,
	`sellerId` varchar(191) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`sellerAcceptedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`expiresAt` datetime,
	`initialPrice` int,
	`counterPrice` int,
	`agreedPrice` int,
	`isAcceptedSeller` boolean NOT NULL DEFAULT false,
	`isAcceptedBuyer` boolean NOT NULL DEFAULT false,
	CONSTRAINT `offers_id` PRIMARY KEY(`id`),
	CONSTRAINT `offers_listingId_unique` UNIQUE(`listingId`),
	CONSTRAINT `offers_buyerId_unique` UNIQUE(`buyerId`),
	CONSTRAINT `offers_sellerId_unique` UNIQUE(`sellerId`)
);
--> statement-breakpoint
CREATE TABLE `profile` (
	`id` varchar(191) NOT NULL,
	`name` varchar(191),
	`surname` varchar(191),
	`email` varchar(191),
	`contactNum` int,
	CONSTRAINT `profile_id` PRIMARY KEY(`id`),
	CONSTRAINT `profile_id_unique` UNIQUE(`id`),
	CONSTRAINT `profile_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `userReport` (
	`id` varchar(191) NOT NULL,
	`authorId` varchar(191) NOT NULL,
	`userId` varchar(191) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`isActive` boolean NOT NULL DEFAULT true,
	`title` varchar(191) NOT NULL,
	`description` varchar(191) NOT NULL,
	`body` text NOT NULL,
	CONSTRAINT `userReport_id` PRIMARY KEY(`id`),
	CONSTRAINT `userReport_authorId_unique` UNIQUE(`authorId`),
	CONSTRAINT `userReport_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(191) NOT NULL,
	`admin` boolean NOT NULL DEFAULT false,
	`name` varchar(55),
	`email` varchar(255),
	`image` varchar(255),
	`coolingDown` boolean NOT NULL DEFAULT false,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`)
);
