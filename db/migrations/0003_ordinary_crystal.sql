DROP TABLE `posts`;
--> statement-breakpoint
ALTER TABLE `profiles`
ADD CONSTRAINT `profiles_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;