-- AlterTable
ALTER TABLE `comment` MODIFY `text` TEXT NOT NULL;

-- CreateIndex
CREATE FULLTEXT INDEX `Comment_text_idx` ON `Comment`(`text`);

-- CreateIndex
CREATE FULLTEXT INDEX `Post_text_idx` ON `Post`(`text`);
