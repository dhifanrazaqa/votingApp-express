class Unauthorized extends Error {
  constructor (
    public errorCode: number = 401,
    public errorMessage: string,
    public errorDescription: string
  ) {
    super()

    this.errorCode = errorCode
    this.errorMessage = errorMessage
    this.errorDescription = errorDescription
  }
}

export default Unauthorized
