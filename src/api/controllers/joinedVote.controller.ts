import { type Response, type NextFunction } from 'express'
import { type IRequest } from '../../common/interfaces'
import Success from '../../responses/successful/Success'
import { createJoinedVote, getAllJoinedVotes, removeJoinedVote } from '../services/joinedVote.service'

const joinVote = async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const userId = req.user.id

    const joinedVote = await createJoinedVote(id, userId as string)

    const response = new Success('Vote joined', joinedVote).toJson
    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
}

const joinedVotes = async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user.id

    const joinedVotes = await getAllJoinedVotes(userId as string)

    const response = new Success('Success', joinedVotes).toJson
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

const leaveVote = async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const userId = req.user.id

    await removeJoinedVote(id, userId as string)

    const response = new Success('Vote deleted').toJson
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

export {
  joinVote,
  joinedVotes,
  leaveVote
}
