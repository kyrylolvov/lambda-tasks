CREATE TABLE `crypto_currencies` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(255) NOT NULL);

CREATE TABLE `markets` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(255) NOT NULL);

CREATE TABLE `rates` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`price` float NOT NULL,
	`date` timestamp DEFAULT (now()),
	`market` int NOT NULL,
	`cryptocurrency` int NOT NULL);

ALTER TABLE `rates` ADD CONSTRAINT `rates_market_markets_id_fk` FOREIGN KEY (`market`) REFERENCES `markets`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `rates` ADD CONSTRAINT `rates_cryptocurrency_crypto_currencies_id_fk` FOREIGN KEY (`cryptocurrency`) REFERENCES `crypto_currencies`(`id`) ON DELETE no action ON UPDATE no action;