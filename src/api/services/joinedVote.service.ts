import { ErrorDescription, StatusCode } from '../../common/constant'
import { type IJoinedVote } from '../../common/interfaces'
import NotFound from '../../responses/clientErrors/NotFound'
import UnprocessableEntity from '../../responses/clientErrors/UnprocessableEntity'
import { deleteJoinedVoteById, findAllJoinedVotes, findJoinedVote, insertJoinedVote } from '../repositories/joinedVote.repository'
import { findVoteById } from '../repositories/vote.repository'

const createJoinedVote = async (id: string, userId: string): Promise<IJoinedVote> => {
  const vote = await findVoteById(id)
  if (vote == null) {
    throw new NotFound(
      StatusCode.NOT_FOUND,
      'No such vote',
      ErrorDescription.NOT_FOUND
    )
  }

  const joinedVote = await findJoinedVote(id, userId)
  if (joinedVote !== null) {
    throw new UnprocessableEntity(
      StatusCode.UNPROCESSABLE_ENTITY,
      'Vote already joined',
      ErrorDescription.INVALID_INPUT
    )
  }

  const newJoinedVote = await insertJoinedVote(id, userId)

  return newJoinedVote
}

const getAllJoinedVotes = async (userId: string): Promise<IJoinedVote[] | []> => {
  const joinedVotes = await findAllJoinedVotes(userId)

  return joinedVotes
}

const removeJoinedVote = async (id: string, userId: string): Promise<void> => {
  const vote = await findJoinedVote(id, userId)
  if (vote == null) {
    throw new NotFound(
      StatusCode.NOT_FOUND,
      'No such joined vote',
      ErrorDescription.NOT_FOUND
    )
  }

  await deleteJoinedVoteById(id, userId)
}

export {
  createJoinedVote,
  getAllJoinedVotes,
  removeJoinedVote
}
