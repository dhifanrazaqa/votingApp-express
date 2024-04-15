import { PrismaClient } from '@prisma/client'
import { type IJoinedVote } from '../../common/interfaces'

const prisma = new PrismaClient()

const insertJoinedVote = async (id: string, userId: string): Promise<IJoinedVote> => {
  const vote = await prisma.userVote.create({
    data: {
      userId,
      voteId: id
    }
  })

  return vote
}

const findAllJoinedVotes = async (userId: string): Promise<IJoinedVote[] | []> => {
  const votes = await prisma.userVote.findMany({
    where: {
      userId
    },
    include: {
      vote: true
    }
  })

  return votes
}

const findJoinedVote = async (id: string, userId: string): Promise<IJoinedVote | null> => {
  const joinedVote = await prisma.userVote.findUnique({
    where: {
      userId_voteId: {
        userId,
        voteId: id
      }
    }
  })

  return joinedVote
}

const deleteJoinedVoteById = async (id: string, userId: string): Promise<void> => {
  await prisma.userVote.delete({
    where: {
      userId_voteId: {
        userId,
        voteId: id
      }
    }
  })
}

export {
  insertJoinedVote,
  findAllJoinedVotes,
  findJoinedVote,
  deleteJoinedVoteById
}
