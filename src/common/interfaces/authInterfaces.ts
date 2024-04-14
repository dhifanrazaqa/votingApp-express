import { type UserRole } from '../constant'

export interface IUserJwtPayload {
  id: string
  role: UserRole
  tokenType: string
}
