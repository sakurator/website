/*
  Warnings:

  - You are about to drop the `alphabets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `letters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rows` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `letters` DROP FOREIGN KEY `letters_ibfk_1`;

-- DropForeignKey
ALTER TABLE `rows` DROP FOREIGN KEY `rows_ibfk_1`;

-- DropTable
DROP TABLE `alphabets`;

-- DropTable
DROP TABLE `letters`;

-- DropTable
DROP TABLE `rows`;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_name_key`(`name`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AlphabetProgress` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `perals` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Alphabet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Row` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `letter` VARCHAR(191) NOT NULL,
    `petals_to_complete` INTEGER NOT NULL,
    `alphabet_id` INTEGER NOT NULL,

    INDEX `alphabet_id`(`alphabet_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Letter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `row_id` INTEGER NOT NULL,

    INDEX `row_id`(`row_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AlphabetProgress` ADD CONSTRAINT `AlphabetProgress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Row` ADD CONSTRAINT `Row_alphabet_id_fkey` FOREIGN KEY (`alphabet_id`) REFERENCES `Alphabet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Letter` ADD CONSTRAINT `Letter_row_id_fkey` FOREIGN KEY (`row_id`) REFERENCES `Row`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
