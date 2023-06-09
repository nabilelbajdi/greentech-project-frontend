-- AlterTable
ALTER TABLE `notification` ADD COLUMN `type` VARCHAR(191) NULL,
    MODIFY `from_id` VARCHAR(191) NULL,
    MODIFY `message` VARCHAR(191) NULL;
