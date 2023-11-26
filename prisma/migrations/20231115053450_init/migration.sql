-- CreateTable
CREATE TABLE `alphabets` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(32) NOT NULL,

    UNIQUE INDEX `id`(`id`),
    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `letters` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(3) NOT NULL,
    `row_id` BIGINT NOT NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `row_id`(`row_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rows` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(32) NOT NULL,
    `letter` VARCHAR(32) NOT NULL,
    `petals_to_complete` INTEGER NOT NULL DEFAULT 500,
    `alphabet_id` BIGINT NOT NULL,

    UNIQUE INDEX `id`(`id`),
    INDEX `alphabet_id`(`alphabet_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `letters` ADD CONSTRAINT `letters_ibfk_1` FOREIGN KEY (`row_id`) REFERENCES `rows`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `rows` ADD CONSTRAINT `rows_ibfk_1` FOREIGN KEY (`alphabet_id`) REFERENCES `alphabets`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
