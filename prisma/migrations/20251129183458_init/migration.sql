-- CreateTable
CREATE TABLE "Meeting" (
    "_id" TEXT NOT NULL,
    "meetingTitle" TEXT NOT NULL,
    "meetingDate" TIMESTAMP(3) NOT NULL,
    "memberId" TEXT NOT NULL,
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Meeting_pkey" PRIMARY KEY ("_id")
);

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("_id") ON DELETE CASCADE ON UPDATE CASCADE;
