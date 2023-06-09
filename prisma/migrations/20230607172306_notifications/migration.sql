-- CreateTable
CREATE TABLE `Notification` (
    `id` VARCHAR(191) NOT NULL,
    `from_id` VARCHAR(191) NOT NULL,
    `to_id` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `seen` DATETIME(3) NULL,
    `clicked` BOOLEAN NOT NULL DEFAULT false,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Notification_to_id_idx`(`to_id`),
    INDEX `Notification_from_id_idx`(`from_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
