import { ErrorDescription } from '../../common/constant'
import { type IUser, type IUserPayload } from '../../common/interfaces'
import NotFound from '../../responses/clientErrors/NotFound'
import UnprocessableEntity from '../../responses/clientErrors/UnprocessableEntity'
import { findAllUsers, findUserByEmail, findUserById, insertUser } from '../repositories/user.repository'
import { hashSync } from 'bcrypt'

const createUser = async (userData: IUserPayload): Promise<IUser> => {
  const isUserExist = await findUserByEmail(userData.email)
  if (isUserExist != null) {
    throw new UnprocessableEntity(
      422,
      'Email already registered',
      ErrorDescription.INVALID_INPUT
    )
  }

  const { password } = userData
  const hashedPassword = hashSync(password, 12)

  userData.password = hashedPassword

  const user = await insertUser(userData)

  return user
}

const getUser = async (id: string): Promise<IUser | null> => {
  const user = await findUserById(id)
  if (user == null) {
    throw new NotFound(
      404,
      'No such user',
      ErrorDescription.NOT_FOUND
    )
  }

  return user
}

const getAllUsers = async (): Promise<IUser[] | []> => {
  const users = await findAllUsers()

  return users
}

export {
  createUser,
  getUser,
  getAllUsers
}
