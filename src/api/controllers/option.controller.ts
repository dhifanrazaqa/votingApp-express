import { type Request, type Response, type NextFunction } from 'express'
import { type IOptionPayload, type IRequest } from '../../common/interfaces'
import Success from '../../responses/successful/Success'
import { createOption, getAllOptions, getOption, removeOption, updateOption } from '../services/option.service'

const addOption = async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, voteId } = req.body

    const optionData: IOptionPayload = {
      title,
      voteId
    }

    const option = await createOption(optionData)

    const response = new Success('Option added', option).toJson
    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
}

const options = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { voteId } = req.params

    const options = await getAllOptions(voteId)

    const response = new Success('Success', options).toJson
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

const option = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params

    const option = await getOption(id)

    const response = new Success('Success', option).toJson
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

const deleteOption = async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params

    await removeOption(id)

    const response = new Success('Option deleted').toJson
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

const putOption = async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const { title } = req.body

    const optionData: IOptionPayload = {
      title,
      voteId: ''
    }

    const option = await updateOption(id, optionData)

    const response = new Success('Option updated', option).toJson
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

export {
  addOption,
  options,
  option,
  deleteOption,
  putOption
}
