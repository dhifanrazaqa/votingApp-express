import { type Request, type Response, type NextFunction } from 'express'
import { type IUserLoginPayload } from '../../common/interfaces'
import Success from '../../responses/successful/Success'
import { loginUser } from '../services/auth.service'

const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body

    const authData: IUserLoginPayload = {
      email,
      password
    }

    const token = await loginUser(authData)

    const response = new Success('success', { accessToken: token }).toJson
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

export {
  login
}
