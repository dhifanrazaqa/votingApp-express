import { type ISuccessResponse } from '../../common/interfaces'
import { type SuccessData } from '../../common/types'

class Success {
  private readonly _message: string
  private readonly _data: SuccessData

  constructor (message: string = 'success', data: SuccessData = null) {
    this._data = data
    this._message = message
  }

  get toJson (): ISuccessResponse {
    const response: ISuccessResponse = {
      message: this._message
    }

    if (this._data === null) {
      return response
    }

    response.data = this._data

    return response
  }
}

export default Success
