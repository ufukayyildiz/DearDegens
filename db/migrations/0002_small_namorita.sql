ALTER TABLE `posts` DROP FOREIGN KEY `posts_author_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `profiles` DROP FOREIGN KEY `profiles_user_id_users_id_fk`;