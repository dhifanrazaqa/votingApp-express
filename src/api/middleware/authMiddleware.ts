import Unauthorized from '../../responses/clientErrors/Unauthorized'

import { validateToken } from '../../utils/authUtils'
import { ErrorDescription, StatusCode } from '../../common/constant'

import { type Request, type Response, type NextFunction } from 'express'
import { type JwtPayload } from 'jsonwebtoken'

const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization
    if (token == null) {
      throw new Unauthorized(
        StatusCode.UNAUTHENTICATED,
        'Token doesn\'t exist',
        ErrorDescription.UNAUTHENTICATED
      )
    }

    const payload: JwtPayload = validateToken(token)
    if (payload.tokenType !== 'access') {
      throw new Unauthorized(
        StatusCode.UNAUTHENTICATED,
        'Invalid Authorization header',
        ErrorDescription.UNAUTHENTICATED
      )
    }

    req.user = payload
    next()
  } catch (e) {
    next(e)
  }
}

export default auth
