-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `order_idUser_fkey`;

-- AlterTable
ALTER TABLE `order` MODIFY `idUser` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `profilePicture` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `user`(`idUser`) ON DELETE SET NULL ON UPDATE CASCADE;
