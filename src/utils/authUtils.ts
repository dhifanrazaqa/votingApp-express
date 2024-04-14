import * as jwt from 'jsonwebtoken'
import Unauthorized from '../responses/clientErrors/Unauthorized'
import { StatusCode, ErrorDescription } from '../common/constant'
import { type IUserJwtPayload } from '../common/interfaces'

export const generateJWT = (payload: IUserJwtPayload): string => {
  const privateKey = process.env.JWT_SECRETS ?? 'mysupersecretkey'

  return jwt.sign(
    payload,
    privateKey,
    {
      expiresIn: '12h'
    }
  )
}

export const validateToken = (token: string): jwt.JwtPayload => {
  try {
    const publicKey = process.env.JWT_SECRETS ?? 'mysupersecretkey'
    return jwt.verify(token, publicKey) as jwt.JwtPayload
  } catch (e) {
    throw new Unauthorized(
      StatusCode.UNAUTHENTICATED,
      'Invalid token',
      ErrorDescription.UNAUTHENTICATED
    )
  }
}

export const extractToken = function (token: string): string | null {
  if (token?.startsWith('Bearer ')) {
    return token.slice(7, token.length)
  }
  return null
}
