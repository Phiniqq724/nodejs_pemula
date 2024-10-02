/*
  Warnings:

  - You are about to drop the column `profilePictutre` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `profilePictutre`,
    ADD COLUMN `profilePicture` VARCHAR(255) NOT NULL DEFAULT '';
