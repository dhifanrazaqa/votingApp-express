/*
  Warnings:

  - You are about to drop the `JoinedVote` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "JoinedVote" DROP CONSTRAINT "JoinedVote_userId_fkey";

-- DropForeignKey
ALTER TABLE "JoinedVote" DROP CONSTRAINT "JoinedVote_voteId_fkey";

-- DropTable
DROP TABLE "JoinedVote";

-- CreateTable
CREATE TABLE "UserVote" (
    "userId" TEXT NOT NULL,
    "voteId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserVote_pkey" PRIMARY KEY ("userId","voteId")
);

-- CreateTable
CREATE TABLE "UserVoteOption" (
    "userId" TEXT NOT NULL,
    "voteId" TEXT NOT NULL,
    "optionId" TEXT NOT NULL,
    "voteddAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserVoteOption_pkey" PRIMARY KEY ("userId","voteId","optionId")
);

-- AddForeignKey
ALTER TABLE "UserVote" ADD CONSTRAINT "UserVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVote" ADD CONSTRAINT "UserVote_voteId_fkey" FOREIGN KEY ("voteId") REFERENCES "Vote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVoteOption" ADD CONSTRAINT "UserVoteOption_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVoteOption" ADD CONSTRAINT "UserVoteOption_voteId_fkey" FOREIGN KEY ("voteId") REFERENCES "Vote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVoteOption" ADD CONSTRAINT "UserVoteOption_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
