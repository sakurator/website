/*
  Warnings:

  - You are about to drop the `alphabet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `alphabetprogress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `letter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `row` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `alphabetprogress` DROP FOREIGN KEY `AlphabetProgress_userId_fkey`;

-- DropForeignKey
ALTER TABLE `letter` DROP FOREIGN KEY `Letter_row_id_fkey`;

-- DropForeignKey
ALTER TABLE `row` DROP FOREIGN KEY `Row_alphabet_id_fkey`;

-- DropTable
DROP TABLE `alphabet`;

-- DropTable
DROP TABLE `alphabetprogress`;

-- DropTable
DROP TABLE `letter`;

-- DropTable
DROP TABLE `row`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `users_name_key`(`name`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `alphabet_progresses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `perals` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `alphabets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rows` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `letter` VARCHAR(191) NOT NULL,
    `petals_to_complete` INTEGER NOT NULL,
    `alphabet_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `letters` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `row_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `alphabet_progresses` ADD CONSTRAINT `alphabet_progresses_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rows` ADD CONSTRAINT `rows_alphabet_id_fkey` FOREIGN KEY (`alphabet_id`) REFERENCES `alphabets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `letters` ADD CONSTRAINT `letters_row_id_fkey` FOREIGN KEY (`row_id`) REFERENCES `rows`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
