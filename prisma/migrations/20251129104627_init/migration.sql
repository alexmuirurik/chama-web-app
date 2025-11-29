/*
  Warnings:

  - You are about to drop the column `profilePic` on the `Chama` table. All the data in the column will be lost.
  - You are about to drop the column `loanId` on the `Deduction` table. All the data in the column will be lost.
  - You are about to drop the column `loanType` on the `Deduction` table. All the data in the column will be lost.
  - You are about to drop the column `penaltyId` on the `Deduction` table. All the data in the column will be lost.
  - You are about to drop the column `shortLoanId` on the `Deduction` table. All the data in the column will be lost.
  - You are about to drop the column `savings` on the `Saving` table. All the data in the column will be lost.
  - You are about to drop the column `welfare` on the `Saving` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[savingId]` on the table `Deduction` will be added. If there are existing duplicate values, this will fail.
  - Made the column `minimumSavings` on table `Chama` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "LoanType" AS ENUM ('LONG_TERM', 'SHORT_TERM');

-- DropForeignKey
ALTER TABLE "Deduction" DROP CONSTRAINT "Deduction_loanId_fkey";

-- DropForeignKey
ALTER TABLE "Deduction" DROP CONSTRAINT "Deduction_penaltyId_fkey";

-- DropForeignKey
ALTER TABLE "Deduction" DROP CONSTRAINT "Deduction_shortLoanId_fkey";

-- AlterTable
ALTER TABLE "BalanceSheet" ADD COLUMN     "loanLimit" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "shortLoanLimit" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Chama" DROP COLUMN "profilePic",
ADD COLUMN     "interestRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "minimumSavings" SET NOT NULL;

-- AlterTable
ALTER TABLE "Deduction" DROP COLUMN "loanId",
DROP COLUMN "loanType",
DROP COLUMN "penaltyId",
DROP COLUMN "shortLoanId",
ADD COLUMN     "loanAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "penaltyAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "savings" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "shortLoanAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "welfare" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Loan" ADD COLUMN     "loanType" "LoanType" NOT NULL DEFAULT 'LONG_TERM';

-- AlterTable
ALTER TABLE "Saving" DROP COLUMN "savings",
DROP COLUMN "welfare",
ADD COLUMN     "loanId" TEXT,
ADD COLUMN     "penaltyId" TEXT,
ADD COLUMN     "shortLoanId" TEXT;

-- AlterTable
ALTER TABLE "ShortLoan" ADD COLUMN     "loanType" "LoanType" NOT NULL DEFAULT 'SHORT_TERM';

-- CreateIndex
CREATE UNIQUE INDEX "Deduction_savingId_key" ON "Deduction"("savingId");

-- AddForeignKey
ALTER TABLE "Saving" ADD CONSTRAINT "Saving_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "Loan"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saving" ADD CONSTRAINT "Saving_shortLoanId_fkey" FOREIGN KEY ("shortLoanId") REFERENCES "ShortLoan"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saving" ADD CONSTRAINT "Saving_penaltyId_fkey" FOREIGN KEY ("penaltyId") REFERENCES "Penalty"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
