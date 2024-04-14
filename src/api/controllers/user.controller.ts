import { type Request, type Response, type NextFunction } from 'express'
import { createUser, getAllUsers, getUser } from '../services/user.service'
import { type IUserPayload } from '../../common/interfaces'
import Success from '../../responses/successful/Success'

const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, name, password } = req.body

    const userData: IUserPayload = {
      email,
      name,
      password,
      role: 'USER'
    }

    const user = await createUser(userData)

    const response = new Success('User registered', user).toJson
    res.status(201).json(response)
  } catch (error) {
    next(error)
  }
}

const user = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params

    const user = await getUser(id)

    const response = new Success('Success', user).toJson
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

const users = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await getAllUsers()

    const response = new Success('Success', users).toJson
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

export {
  register,
  user,
  users
}
