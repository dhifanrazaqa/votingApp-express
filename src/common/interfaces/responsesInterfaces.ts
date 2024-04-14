import { type SuccessData } from '../types'

export interface ISuccessResponse {
  message: string
  data?: SuccessData
}

export interface ICustomErrorResponse {
  errorMessage: string
  errorCode: number
  errorDescription: string
}
