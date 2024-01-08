CREATE TABLE `posts` (
  `id` serial AUTO_INCREMENT NOT NULL,
  `text` varchar(256),
  `author_id` int NOT NULL,
  CONSTRAINT `posts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `profiles` (
  `id` serial AUTO_INCREMENT NOT NULL,
  `bio` varchar(256),
  `user_id` int NOT NULL,
  CONSTRAINT `profiles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
  `id` serial AUTO_INCREMENT NOT NULL,
  `full_name` text,
  `phone` varchar(256),
  `address` varchar(256),
  `score` int,
  CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP TABLE `post`;
--> statement-breakpoint
DROP TABLE `user`;
--> statement-breakpoint
ALTER TABLE `posts`
ADD CONSTRAINT `posts_author_id_users_id_fk` FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE `profiles`
ADD CONSTRAINT `profiles_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;