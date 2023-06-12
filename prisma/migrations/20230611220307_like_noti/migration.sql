-- AlterTable
ALTER TABLE `notification` ADD COLUMN `targetPost_id` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `Notification_targetPost_id_idx` ON `Notification`(`targetPost_id`);
