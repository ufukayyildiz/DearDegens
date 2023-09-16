CREATE TABLE `user` (
	`id` varchar(191) NOT NULL,
	`admin` boolean NOT NULL DEFAULT false,
	`name` varchar(191),
	`email` varchar(191),
	`emailVerified` timestamp(3) DEFAULT (now()),
	`image` varchar(191),
	`coolingDown` boolean NOT NULL DEFAULT false,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
DROP TABLE `users`;