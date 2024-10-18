/*
  Warnings:

  - You are about to alter the column `name` on the `Expense` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(64)`.

*/
-- DropIndex
DROP INDEX "Budget_name_key";

-- AlterTable
ALTER TABLE "Expense" ALTER COLUMN "name" SET DATA TYPE VARCHAR(64);
