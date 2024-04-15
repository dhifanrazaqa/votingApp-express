import { compareSync } from 'bcrypt'
import { ErrorDescription } from '../../common/constant'
import { type IUserLoginPayload } from '../../common/interfaces/authInterfaces'
import { findUserByEmail } from '../repositories/user.repository'
import BadRequest from '../../responses/clientErrors/BadRequest'
import { generateJWT } from '../../utils/authUtils'

const loginUser = async (userData: IUserLoginPayload): Promise<string> => {
  const user = await findUserByEmail(userData.email)
  if (user == null) {
    throw new BadRequest(
      400,
      'You have entered an invalid email address or password',
      ErrorDescription.INVALID_INPUT
    )
  }

  const { password } = userData
  const isValidPassword = compareSync(password, user.password)
  if (!isValidPassword) {
    throw new BadRequest(
      400,
      'You have entered an invalid email address or password',
      ErrorDescription.INVALID_INPUT
    )
  }

  const token = generateJWT({
    id: user.id,
    role: user.role,
    tokenType: 'access'
  })

  return token
}

export {
  loginUser
}
