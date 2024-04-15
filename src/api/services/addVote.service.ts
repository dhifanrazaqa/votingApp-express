import { ErrorDescription, StatusCode } from '../../common/constant'
import { type ICountResult, type IAddVote } from '../../common/interfaces'
import NotFound from '../../responses/clientErrors/NotFound'
import UnprocessableEntity from '../../responses/clientErrors/UnprocessableEntity'
import { deleteAddVoteById, findAddVote, findAllVotesResultById, insertAddVote } from '../repositories/addVote.repository'
import { findOptionById } from '../repositories/option.repository'
import { findVoteById } from '../repositories/vote.repository'

const createAddVote = async (addVoteData: IAddVote): Promise<IAddVote> => {
  const vote = await findVoteById(addVoteData.voteId)
  if (vote == null) {
    throw new NotFound(
      StatusCode.NOT_FOUND,
      'No such vote',
      ErrorDescription.NOT_FOUND
    )
  }

  const option = await findOptionById(addVoteData.optionId)
  if (option == null) {
    throw new NotFound(
      StatusCode.NOT_FOUND,
      'No such option',
      ErrorDescription.NOT_FOUND
    )
  }

  const addedVote = await findAddVote(addVoteData)
  if (addedVote !== null) {
    throw new UnprocessableEntity(
      StatusCode.UNPROCESSABLE_ENTITY,
      'Vote answer already added',
      ErrorDescription.INVALID_INPUT
    )
  }

  const newAddVote = await insertAddVote(addVoteData)

  return newAddVote
}

const getVoteResult = async (voteId: string): Promise<ICountResult[] | []> => {
  const joinedVotes = await findAllVotesResultById(voteId)

  return joinedVotes
}

const removeAddVote = async (addVoteData: IAddVote): Promise<void> => {
  const vote = await findAddVote(addVoteData)
  if (vote == null) {
    throw new NotFound(
      StatusCode.NOT_FOUND,
      'No such add vote',
      ErrorDescription.NOT_FOUND
    )
  }

  await deleteAddVoteById(addVoteData)
}

export {
  createAddVote,
  getVoteResult,
  removeAddVote
}
