/*
  Warnings:

  - You are about to drop the column `longTermLoanId` on the `Deduction` table. All the data in the column will be lost.
  - You are about to drop the column `memberId` on the `Deduction` table. All the data in the column will be lost.
  - You are about to drop the column `shortTermLoanId` on the `Deduction` table. All the data in the column will be lost.
  - You are about to drop the column `deductionId` on the `Saving` table. All the data in the column will be lost.
  - You are about to drop the `LongTermLoan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LongTermLoanRepayment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShortTermLoan` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `savingId` to the `Deduction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Deduction" DROP CONSTRAINT "Deduction_longTermLoanId_fkey";

-- DropForeignKey
ALTER TABLE "Deduction" DROP CONSTRAINT "Deduction_memberId_fkey";

-- DropForeignKey
ALTER TABLE "Deduction" DROP CONSTRAINT "Deduction_shortTermLoanId_fkey";

-- DropForeignKey
ALTER TABLE "LongTermLoan" DROP CONSTRAINT "LongTermLoan_memberId_fkey";

-- DropForeignKey
ALTER TABLE "LongTermLoan" DROP CONSTRAINT "LongTermLoan_penaltyId_fkey";

-- DropForeignKey
ALTER TABLE "LongTermLoanRepayment" DROP CONSTRAINT "LongTermLoanRepayment_longTermLoanId_fkey";

-- DropForeignKey
ALTER TABLE "Saving" DROP CONSTRAINT "Saving_deductionId_fkey";

-- DropForeignKey
ALTER TABLE "ShortTermLoan" DROP CONSTRAINT "ShortTermLoan_memberId_fkey";

-- DropForeignKey
ALTER TABLE "ShortTermLoan" DROP CONSTRAINT "ShortTermLoan_penaltyId_fkey";

-- AlterTable
ALTER TABLE "Deduction" DROP COLUMN "longTermLoanId",
DROP COLUMN "memberId",
DROP COLUMN "shortTermLoanId",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "loanId" TEXT,
ADD COLUMN     "loanType" TEXT,
ADD COLUMN     "savingId" TEXT NOT NULL,
ADD COLUMN     "shortLoanId" TEXT;

-- AlterTable
ALTER TABLE "Penalty" ADD COLUMN     "loanId" TEXT,
ADD COLUMN     "shortLoanId" TEXT;

-- AlterTable
ALTER TABLE "Saving" DROP COLUMN "deductionId";

-- DropTable
DROP TABLE "LongTermLoan";

-- DropTable
DROP TABLE "LongTermLoanRepayment";

-- DropTable
DROP TABLE "ShortTermLoan";

-- CreateTable
CREATE TABLE "Loan" (
    "_id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "principle" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "loanAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "interest" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "termMonths" INTEGER NOT NULL DEFAULT 0,
    "paymentDate" TIMESTAMP(3),
    "loanDocument" TEXT,
    "guarantors" TEXT[],
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Loan_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "ShortLoan" (
    "_id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "principle" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "loanAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "interest" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "paymentDate" TIMESTAMP(3),
    "loanDocument" TEXT,
    "guarantors" TEXT[],
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShortLoan_pkey" PRIMARY KEY ("_id")
);

-- AddForeignKey
ALTER TABLE "Deduction" ADD CONSTRAINT "Deduction_savingId_fkey" FOREIGN KEY ("savingId") REFERENCES "Saving"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deduction" ADD CONSTRAINT "Deduction_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "Loan"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deduction" ADD CONSTRAINT "Deduction_shortLoanId_fkey" FOREIGN KEY ("shortLoanId") REFERENCES "ShortLoan"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShortLoan" ADD CONSTRAINT "ShortLoan_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penalty" ADD CONSTRAINT "Penalty_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "Loan"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penalty" ADD CONSTRAINT "Penalty_shortLoanId_fkey" FOREIGN KEY ("shortLoanId") REFERENCES "ShortLoan"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
