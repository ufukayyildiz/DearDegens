CREATE TABLE `accounts` (
  `id` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `provider` varchar(255) NOT NULL,
  `providerAccountId` varchar(255) NOT NULL,
  `access_token` text,
  `expires_in` int,
  `id_token` text,
  `refresh_token` text,
  `refresh_token_expires_in` int,
  `scope` varchar(255),
  `token_type` varchar(255),
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `accounts_id` PRIMARY KEY(`id`),
  CONSTRAINT `accounts__provider__providerAccountId__idx` UNIQUE(`provider`, `providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `listings` (
  `id` varchar(191) NOT NULL,
  `authorId` varchar(191) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp DEFAULT CURRENT_TIMESTAMP,
  `expirationDate` datetime,
  `purgeDate` datetime,
  `category` varchar(191),
  `price` int,
  `brand` varchar(191),
  `model` varchar(191),
  `title` varchar(191),
  `description` text,
  `images` text,
  `location` varchar(191),
  `meetup` varchar(191),
  `isNew` boolean DEFAULT true,
  `isUrgent` boolean DEFAULT false,
  `isPending` boolean DEFAULT false,
  `isHot` boolean DEFAULT false,
  `isSold` boolean DEFAULT false,
  CONSTRAINT `listings_id` PRIMARY KEY(`id`),
  CONSTRAINT `listings__id__idx` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `adId` text,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `title` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `body` text NOT NULL,
  `isRead` boolean DEFAULT false,
  CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `offers` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `userName` varchar(191),
  `adId` varchar(191) NOT NULL,
  `adTitle` varchar(191),
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expirationDate` datetime,
  `purgeDate` datetime,
  `askPrice` int,
  `offerPrice` int,
  `counterPrice` int,
  `isAccepted` boolean DEFAULT false,
  `isConfirmed` boolean DEFAULT false,
  CONSTRAINT `offers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `queries` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `userName` varchar(191),
  `adId` varchar(191) NOT NULL,
  `sellerId` varchar(191),
  `adTitle` varchar(191),
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expirationDate` datetime,
  `purgeDate` datetime,
  `query` varchar(191),
  `reply` varchar(191),
  `isAnswered` boolean DEFAULT false,
  CONSTRAINT `queries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `sessionToken` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `expires` datetime NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `sessions_id` PRIMARY KEY(`id`),
  CONSTRAINT `sessions__sessionToken__idx` UNIQUE(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `admin` boolean NOT NULL DEFAULT false,
  `name` varchar(255),
  `email` varchar(255) NOT NULL,
  `emailVerified` timestamp,
  `image` varchar(255),
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `coolingDown` boolean NOT NULL DEFAULT false,
  CONSTRAINT `users_id` PRIMARY KEY(`id`),
  CONSTRAINT `users__email__idx` UNIQUE(`email`)
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
CREATE INDEX `accounts__userId__idx` ON `accounts` (`userId`);
--> statement-breakpoint
CREATE INDEX `sessions__userId__idx` ON `sessions` (`userId`);
--> statement-breakpoint
ALTER TABLE `listings`
ADD CONSTRAINT `listings_authorId_users_id_fk` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE `notifications`
ADD CONSTRAINT `notifications_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE `offers`
ADD CONSTRAINT `offers_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE `offers`
ADD CONSTRAINT `offers_adId_listings_id_fk` FOREIGN KEY (`adId`) REFERENCES `listings`(`id`) ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE `queries`
ADD CONSTRAINT `queries_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE `queries`
ADD CONSTRAINT `queries_adId_listings_id_fk` FOREIGN KEY (`adId`) REFERENCES `listings`(`id`) ON DELETE no action ON UPDATE no action;