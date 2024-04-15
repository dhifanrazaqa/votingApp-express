import { type Request, type Response, type NextFunction } from 'express'
import { type IVotePayload, type IRequest } from '../../common/interfaces'
import Success from '../../responses/successful/Success'
import { createVote, getAllVotes, getVote, removeVote, updateVote } from '../services/vote.service'

const addNewVote = async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, startAt, endAt } = req.body

    const voteData: IVotePayload = {
      title,
      code: '',
      startAt,
      endAt,
      authorId: req.user.id
    }

    const vote = await createVote(voteData)

    const response = new Success('Vote added', vote).toJson
    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
}

const votes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const votes = await getAllVotes()

    const response = new Success('Success', votes).toJson
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

const vote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params

    const vote = await getVote(id)

    const response = new Success('Success', vote).toJson
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

const deleteVote = async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const userId = req.user.id

    await removeVote(id, userId as string)

    const response = new Success('Vote deleted').toJson
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

const putVote = async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const { title, startAt, endAt } = req.body
    const userId = req.user.id

    const voteData: IVotePayload = {
      title,
      code: '',
      startAt,
      endAt,
      authorId: userId
    }

    const vote = await updateVote(id, userId as string, voteData)

    const response = new Success('Vote updated', vote).toJson
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

export {
  addNewVote,
  votes,
  vote,
  deleteVote,
  putVote
}
