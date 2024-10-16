/*
  Warnings:

  - You are about to drop the `KeyStore` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `KeyStore` DROP FOREIGN KEY `KeyStore_authCredentialId_fkey`;

-- DropTable
DROP TABLE `KeyStore`;
