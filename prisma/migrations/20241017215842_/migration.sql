/*
  Warnings:

  - You are about to alter the column `budget` on the `Budget` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.
  - You are about to alter the column `amount` on the `Expense` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Budget" ALTER COLUMN "budget" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Expense" ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;
