import { type Response, type NextFunction } from 'express'
import { type IAddVote, type IRequest } from '../../common/interfaces'
import Success from '../../responses/successful/Success'
import { createAddVote, getVoteResult, removeAddVote } from '../services/addVote.service'

const addVote = async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const { optionId } = req.body
    const userId = req.user.id

    const addVoteData: IAddVote = {
      voteId: id,
      userId,
      optionId
    }

    const addedVote = await createAddVote(addVoteData)

    const response = new Success('Added vote answer', addedVote).toJson
    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
}

const countVote = async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params

    const resultVote = await getVoteResult(id)

    const response = new Success('Success', resultVote).toJson
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

const unaddVote = async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const { optionId } = req.body
    const userId = req.user.id

    const addVoteData: IAddVote = {
      voteId: id,
      userId,
      optionId
    }

    await removeAddVote(addVoteData)

    const response = new Success('Vote deleted').toJson
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

export {
  addVote,
  countVote,
  unaddVote
}
