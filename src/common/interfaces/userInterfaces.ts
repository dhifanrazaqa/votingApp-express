import { type Role } from '@prisma/client'

export interface IUserPayload {
  email: string
  name: string
  password: string
  role: Role
}

export interface IUser extends IUserPayload {
  id: string
}
