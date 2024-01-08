ALTER TABLE `notification`
ADD CONSTRAINT `notification_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;