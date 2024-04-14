class BadRequest extends Error {
  constructor (
    public errorCode: number = 400,
    public errorMessage: string,
    public errorDescription: string
  ) {
    super()

    this.errorCode = errorCode
    this.errorMessage = errorMessage
    this.errorDescription = errorDescription
  }
}

export default BadRequest
