class NotFound extends Error {
  constructor (
    public errorCode: number = 404,
    public errorMessage: string,
    public errorDescription: string
  ) {
    super()

    this.errorCode = errorCode
    this.errorMessage = errorMessage
    this.errorDescription = errorDescription
  }
}

export default NotFound
