/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Image` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `profilePicture` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Image_url_key` ON `Image`(`url`);
