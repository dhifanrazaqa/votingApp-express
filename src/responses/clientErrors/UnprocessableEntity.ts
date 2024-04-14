class UnprocessableEntity extends Error {
  constructor (
    public errorCode: number = 422,
    public errorMessage: string,
    public errorDescription: string
  ) {
    super()

    this.errorCode = errorCode
    this.errorMessage = errorMessage
    this.errorDescription = errorDescription
  }
}

export default UnprocessableEntity
