/*
  Warnings:

  - You are about to drop the column `user_id` on the `like` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Like_user_id_idx` ON `like`;

-- AlterTable
ALTER TABLE `like` DROP COLUMN `user_id`,
    ADD COLUMN `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `liked_by_id` VARCHAR(191) NULL,
    ADD COLUMN `updated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE INDEX `Like_liked_by_id_idx` ON `Like`(`liked_by_id`);
