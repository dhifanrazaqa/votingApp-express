import Unauthorized from '../../responses/clientErrors/Unauthorized'

import { extractToken, validateToken } from '../../utils/authUtils'
import { ErrorDescription, StatusCode } from '../../common/constant'

import { type Response, type NextFunction } from 'express'
import { type JwtPayload } from 'jsonwebtoken'
import { type IRequest } from '../../common/interfaces/authInterfaces'
import { type Role } from '@prisma/client'
import Forbidden from '../../responses/clientErrors/Forbidden'

const auth = (roleTypes: Role[]) => async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization

    if (token == null) {
      throw new Unauthorized(
        StatusCode.UNAUTHENTICATED,
        'Token doesn\'t exist',
        ErrorDescription.UNAUTHENTICATED
      )
    }

    const extractedToken = extractToken(token)
    if (extractedToken == null) {
      throw new Unauthorized(
        StatusCode.UNAUTHENTICATED,
        'Invalid token',
        ErrorDescription.UNAUTHENTICATED
      )
    }

    const payload: JwtPayload = validateToken(extractedToken)
    if (payload.tokenType !== 'access') {
      throw new Unauthorized(
        StatusCode.UNAUTHENTICATED,
        'Invalid Authorization header',
        ErrorDescription.UNAUTHENTICATED
      )
    }

    if (!roleTypes.includes(payload.role as Role)) {
      throw new Forbidden(
        StatusCode.FORBIDDEN,
        'You\'re not allowed',
        ErrorDescription.FORBIDDEN
      )
    }

    req.user = payload
    next()
  } catch (e) {
    next(e)
  }
}

export default auth
