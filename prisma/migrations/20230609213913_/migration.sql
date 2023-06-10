/*
  Warnings:

  - A unique constraint covering the columns `[donation_id]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[group_id]` on the table `Image` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `event` MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `image` ADD COLUMN `donation_id` VARCHAR(191) NULL,
    ADD COLUMN `group_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `post` ADD COLUMN `group_id` VARCHAR(191) NULL,
    MODIFY `text` TEXT NOT NULL;

-- CreateTable
CREATE TABLE `Donation` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `description` TEXT NULL,
    `category` VARCHAR(191) NULL,
    `condition` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `lat` VARCHAR(191) NULL,
    `lng` VARCHAR(191) NULL,
    `start_time` VARCHAR(191) NULL,
    `start_date` VARCHAR(191) NULL,
    `end_date` VARCHAR(191) NULL,
    `end_time` VARCHAR(191) NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Donation_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Group` (
    `id` VARCHAR(191) NOT NULL,
    `admin_id` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `description` TEXT NULL,
    `start_date` VARCHAR(191) NULL,
    `start_time` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `lat` VARCHAR(191) NULL,
    `lng` VARCHAR(191) NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Group_admin_id_idx`(`admin_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_group` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_group_AB_unique`(`A`, `B`),
    INDEX `_group_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Image_donation_id_key` ON `Image`(`donation_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Image_group_id_key` ON `Image`(`group_id`);

-- CreateIndex
CREATE INDEX `Post_group_id_idx` ON `Post`(`group_id`);
