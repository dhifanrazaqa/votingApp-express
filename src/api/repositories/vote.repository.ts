import { PrismaClient } from '@prisma/client'
import { type IVote, type IVotePayload } from '../../common/interfaces'

const prisma = new PrismaClient()

const insertVote = async (voteData: IVotePayload): Promise<IVote> => {
  const vote = await prisma.vote.create({
    data: {
      title: voteData.title,
      authorId: voteData.authorId,
      code: voteData.code,
      startAt: voteData.startAt,
      endAt: voteData.endAt
    }
  })

  return vote
}

const findAllVotes = async (): Promise<IVote[] | []> => {
  const votes = await prisma.vote.findMany()

  return votes
}

const findVoteById = async (id: string): Promise<IVote | null> => {
  const vote = await prisma.vote.findUnique({
    where: {
      id
    },
    include: {
      options: true
    }
  })

  return vote
}

const deleteVoteById = async (id: string): Promise<void> => {
  await prisma.vote.delete({
    where: {
      id
    }
  })
}

const updateVoteById = async (id: string, voteData: IVotePayload): Promise<IVote | null> => {
  const vote = await prisma.vote.update({
    where: {
      id
    },
    data: {
      title: voteData.title,
      startAt: voteData.startAt,
      endAt: voteData.endAt
    }
  })

  return vote
}

export {
  insertVote,
  findAllVotes,
  findVoteById,
  deleteVoteById,
  updateVoteById
}
