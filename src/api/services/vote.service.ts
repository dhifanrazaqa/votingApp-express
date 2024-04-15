import { ErrorDescription, StatusCode } from '../../common/constant'
import { type IVote, type IVotePayload } from '../../common/interfaces'
import Forbidden from '../../responses/clientErrors/Forbidden'
import NotFound from '../../responses/clientErrors/NotFound'
import { generateRandomCharacters } from '../../utils/generalUtils'
import { deleteVoteById, findAllVotes, findVoteById, insertVote, updateVoteById } from '../repositories/vote.repository'

const createVote = async (voteData: IVotePayload): Promise<IVote> => {
  const code = generateRandomCharacters(5)

  voteData.code = code

  const vote = await insertVote(voteData)

  return vote
}

const getAllVotes = async (): Promise<IVote[] | []> => {
  const votes = await findAllVotes()

  return votes
}

const getVote = async (id: string): Promise<IVote | null> => {
  const vote = await findVoteById(id)
  if (vote == null) {
    throw new NotFound(
      StatusCode.NOT_FOUND,
      'No such vote',
      ErrorDescription.NOT_FOUND
    )
  }

  return vote
}

const removeVote = async (id: string, userId: string): Promise<void> => {
  const vote = await findVoteById(id)
  if (vote == null) {
    throw new NotFound(
      StatusCode.NOT_FOUND,
      'No such vote',
      ErrorDescription.NOT_FOUND
    )
  }

  if (vote.authorId !== userId) {
    throw new Forbidden(
      StatusCode.FORBIDDEN,
      'You\'re not allowed',
      ErrorDescription.FORBIDDEN
    )
  }

  await deleteVoteById(id)
}

const updateVote = async (id: string, userId: string, voteData: IVotePayload): Promise<IVote | null> => {
  const vote = await findVoteById(id)
  if (vote == null) {
    throw new NotFound(
      StatusCode.NOT_FOUND,
      'No such vote',
      ErrorDescription.NOT_FOUND
    )
  }

  if (vote.authorId !== userId) {
    throw new Forbidden(
      StatusCode.FORBIDDEN,
      'You\'re not allowed',
      ErrorDescription.FORBIDDEN
    )
  }

  const updatedVote = await updateVoteById(id, voteData)

  return updatedVote
}

export {
  createVote,
  getAllVotes,
  getVote,
  removeVote,
  updateVote
}
