CREATE TABLE `account` (
	`userId` varchar(191) NOT NULL,
	`type` varchar(191) NOT NULL,
	`provider` varchar(191) NOT NULL,
	`providerAccountId` varchar(191) NOT NULL,
	`refresh_token` varchar(191),
	`access_token` varchar(191),
	`expires_at` int,
	`token_type` varchar(191),
	`scope` varchar(191),
	`id_token` varchar(191),
	`session_state` varchar(191),
	CONSTRAINT `account_provider_providerAccountId` PRIMARY KEY(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`sessionToken` varchar(191) NOT NULL,
	`userId` varchar(191) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `session_sessionToken` PRIMARY KEY(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `verificationToken` (
	`identifier` varchar(191) NOT NULL,
	`token` varchar(191) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `verificationToken_identifier_token` PRIMARY KEY(`identifier`,`token`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `name` varchar(191);--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `email` varchar(191);--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `image` varchar(191);--> statement-breakpoint
ALTER TABLE `users` ADD `emailVerified` timestamp(3) DEFAULT (now());