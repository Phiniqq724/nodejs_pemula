/*
  Warnings:

  - You are about to alter the column `status` on the `order` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `menu` MODIFY `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `order` MODIFY `status` ENUM('NEW', 'PAID', 'DONE') NOT NULL DEFAULT 'NEW';

-- AlterTable
ALTER TABLE `orderlist` ADD COLUMN `note` TEXT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `name` VARCHAR(191) NULL,
    MODIFY `profilePictutre` VARCHAR(255) NOT NULL;
