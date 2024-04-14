import { type ISuccessResponse } from '../../common/interfaces'
import { type SuccessData } from '../../common/types'

class Success {
  private readonly _successCode: number = 200
  private readonly _message: string = 'success'
  private readonly _data: SuccessData

  constructor (data: SuccessData = null) {
    this._data = data
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
