-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MEMBER', 'ADMIN', 'CHAIRMAN', 'SECRETARY', 'VICE_CHAIRMAN', 'TREASURER');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'INCOMPLETE', 'COMPLETED');

-- CreateTable
CREATE TABLE "User" (
    "_id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "role" "Role" DEFAULT 'MEMBER',
    "chamaId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Account" (
    "_id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Session" (
    "_id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "_id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Authenticator" (
    "_id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "credentialPublicKey" TEXT NOT NULL,
    "counter" INTEGER NOT NULL,
    "credentialDeviceType" TEXT NOT NULL,
    "credentialBackedUp" BOOLEAN NOT NULL,
    "transports" TEXT,

    CONSTRAINT "Authenticator_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Chama" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "profilePic" TEXT,
    "registrationDocument" TEXT,
    "minimumSavings" DOUBLE PRECISION DEFAULT 0,
    "nextMeeting" TIMESTAMP(3),
    "registrationId" TEXT,
    "adminId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chama_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "ChamaLoan" (
    "_id" TEXT NOT NULL,
    "chamaId" TEXT NOT NULL,
    "lender" TEXT NOT NULL,
    "loanAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "interest" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "termMonths" INTEGER NOT NULL DEFAULT 0,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "paymentDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChamaLoan_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Projects" (
    "_id" TEXT NOT NULL,
    "chamaId" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "estimatedCost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "actualCost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "sharesUsed" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Member" (
    "_id" TEXT NOT NULL,
    "chamaId" TEXT NOT NULL,
    "userId" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'MEMBER',
    "lastSeen" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "BalanceSheet" (
    "_id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "totalSavings" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalLongTermLoan" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalShortTermLoan" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalDividend" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalPenalties" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalUnpaid" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fixedSavings" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "welfare" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BalanceSheet_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Saving" (
    "_id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "mPesaRef" TEXT,
    "authorizedBy" TEXT,
    "memberId" TEXT NOT NULL,
    "deductionId" TEXT,
    "savings" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "welfare" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Saving_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Deduction" (
    "_id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "longTermLoanId" TEXT,
    "shortTermLoanId" TEXT,
    "penaltyId" TEXT,
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Deduction_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "LongTermLoan" (
    "_id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "penaltyId" TEXT,
    "principle" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "loanAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "interest" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "termMonths" INTEGER NOT NULL DEFAULT 0,
    "dueDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentDate" TIMESTAMP(3),
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LongTermLoan_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "LongTermLoanRepayment" (
    "_id" TEXT NOT NULL,
    "longTermLoanId" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentDate" TIMESTAMP(3),
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LongTermLoanRepayment_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "ShortTermLoan" (
    "_id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "penaltyId" TEXT,
    "principle" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "loanAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "interest" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "termMonths" INTEGER NOT NULL DEFAULT 0,
    "dueDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentDate" TIMESTAMP(3),
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShortTermLoan_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Penalty" (
    "_id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "penaltyAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Penalty_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Dividend" (
    "_id" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "dividendAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "dueDate" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dividend_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Authenticator_userId__id_key" ON "Authenticator"("userId", "_id");

-- CreateIndex
CREATE UNIQUE INDEX "BalanceSheet_memberId_key" ON "BalanceSheet"("memberId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Authenticator" ADD CONSTRAINT "Authenticator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chama" ADD CONSTRAINT "Chama_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChamaLoan" ADD CONSTRAINT "ChamaLoan_chamaId_fkey" FOREIGN KEY ("chamaId") REFERENCES "Chama"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_chamaId_fkey" FOREIGN KEY ("chamaId") REFERENCES "Chama"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_chamaId_fkey" FOREIGN KEY ("chamaId") REFERENCES "Chama"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BalanceSheet" ADD CONSTRAINT "BalanceSheet_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saving" ADD CONSTRAINT "Saving_deductionId_fkey" FOREIGN KEY ("deductionId") REFERENCES "Deduction"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saving" ADD CONSTRAINT "Saving_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deduction" ADD CONSTRAINT "Deduction_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deduction" ADD CONSTRAINT "Deduction_longTermLoanId_fkey" FOREIGN KEY ("longTermLoanId") REFERENCES "LongTermLoan"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deduction" ADD CONSTRAINT "Deduction_shortTermLoanId_fkey" FOREIGN KEY ("shortTermLoanId") REFERENCES "ShortTermLoan"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deduction" ADD CONSTRAINT "Deduction_penaltyId_fkey" FOREIGN KEY ("penaltyId") REFERENCES "Penalty"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LongTermLoan" ADD CONSTRAINT "LongTermLoan_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LongTermLoan" ADD CONSTRAINT "LongTermLoan_penaltyId_fkey" FOREIGN KEY ("penaltyId") REFERENCES "Penalty"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LongTermLoanRepayment" ADD CONSTRAINT "LongTermLoanRepayment_longTermLoanId_fkey" FOREIGN KEY ("longTermLoanId") REFERENCES "LongTermLoan"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShortTermLoan" ADD CONSTRAINT "ShortTermLoan_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShortTermLoan" ADD CONSTRAINT "ShortTermLoan_penaltyId_fkey" FOREIGN KEY ("penaltyId") REFERENCES "Penalty"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penalty" ADD CONSTRAINT "Penalty_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dividend" ADD CONSTRAINT "Dividend_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
