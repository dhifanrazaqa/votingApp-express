import { PrismaClient } from '@prisma/client'
import { type IOption, type IOptionPayload } from '../../common/interfaces'

const prisma = new PrismaClient()

const insertOption = async (optionData: IOptionPayload): Promise<IOption> => {
  const option = await prisma.option.create({
    data: {
      title: optionData.title,
      voteId: optionData.voteId
    }
  })

  return option
}

const findAllOptionsByVoteId = async (voteId: string): Promise<IOption[] | []> => {
  const options = await prisma.option.findMany({
    where: {
      voteId
    }
  })

  return options
}

const findOptionById = async (id: string): Promise<IOption | null> => {
  const option = await prisma.option.findUnique({
    where: {
      id
    }
  })

  return option
}

const deleteOptionById = async (id: string): Promise<void> => {
  await prisma.option.delete({
    where: {
      id
    }
  })
}

const updateOptionById = async (id: string, optionData: IOptionPayload): Promise<IOption | null> => {
  const option = await prisma.option.update({
    where: {
      id
    },
    data: {
      title: optionData.title
    }
  })

  return option
}

export {
  insertOption,
  findAllOptionsByVoteId,
  findOptionById,
  deleteOptionById,
  updateOptionById
}
