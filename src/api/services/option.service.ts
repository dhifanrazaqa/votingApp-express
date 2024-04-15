import { ErrorDescription, StatusCode } from '../../common/constant'
import { type IOption, type IOptionPayload } from '../../common/interfaces'
import NotFound from '../../responses/clientErrors/NotFound'
import { deleteOptionById, findAllOptionsByVoteId, findOptionById, insertOption, updateOptionById } from '../repositories/option.repository'

const createOption = async (optionData: IOptionPayload): Promise<IOption> => {
  const option = await insertOption(optionData)

  return option
}

const getAllOptions = async (voteId: string): Promise<IOption[] | []> => {
  const options = await findAllOptionsByVoteId(voteId)

  return options
}

const getOption = async (id: string): Promise<IOption | null> => {
  const option = await findOptionById(id)
  if (option == null) {
    throw new NotFound(
      StatusCode.NOT_FOUND,
      'No such option',
      ErrorDescription.NOT_FOUND
    )
  }

  return option
}

const removeOption = async (id: string): Promise<void> => {
  const option = await findOptionById(id)
  if (option == null) {
    throw new NotFound(
      StatusCode.NOT_FOUND,
      'No such option',
      ErrorDescription.NOT_FOUND
    )
  }

  await deleteOptionById(id)
}

const updateOption = async (id: string, optionData: IOptionPayload): Promise<IOption | null> => {
  const option = await findOptionById(id)
  if (option == null) {
    throw new NotFound(
      StatusCode.NOT_FOUND,
      'No such option',
      ErrorDescription.NOT_FOUND
    )
  }

  const updatedOption = await updateOptionById(id, optionData)

  return updatedOption
}

export {
  createOption,
  getAllOptions,
  getOption,
  removeOption,
  updateOption
}
