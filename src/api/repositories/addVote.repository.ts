import { PrismaClient } from '@prisma/client'
import { type ICountResult, type IAddVote } from '../../common/interfaces'

const prisma = new PrismaClient()

const insertAddVote = async (addVoteData: IAddVote): Promise<IAddVote> => {
  const vote = await prisma.userVoteOption.create({
    data: {
      userId: addVoteData.userId,
      voteId: addVoteData.voteId,
      optionId: addVoteData.optionId
    }
  })

  return vote
}

const findAllVotesResultById = async (voteId: string): Promise<ICountResult[] | []> => {
  const votes = await prisma.userVoteOption.groupBy({
    by: ['optionId'],
    where: {
      voteId
    },
    _count: {
      _all: true
    }
  })

  return votes
}

const findAddVote = async (addVoteData: IAddVote): Promise<IAddVote | null> => {
  const joinedVote = await prisma.userVoteOption.findUnique({
    where: {
      userId_voteId_optionId: {
        userId: addVoteData.userId,
        voteId: addVoteData.voteId,
        optionId: addVoteData.optionId
      }
    }
  })

  return joinedVote
}

const deleteAddVoteById = async (addVoteData: IAddVote): Promise<void> => {
  await prisma.userVoteOption.delete({
    where: {
      userId_voteId_optionId: {
        userId: addVoteData.userId,
        voteId: addVoteData.voteId,
        optionId: addVoteData.optionId
      }
    }
  })
}

export {
  insertAddVote,
  findAllVotesResultById,
  findAddVote,
  deleteAddVoteById
}
