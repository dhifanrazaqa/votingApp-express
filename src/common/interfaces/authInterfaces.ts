import { type Role } from '@prisma/client'
import { type Request } from 'express'

export interface IUserJwtPayload {
  id: string
  role: Role
  tokenType: string
}

export interface IUserLoginPayload {
  email: string
  password: string
}

export interface IRequest extends Request {
  user?: any
}
