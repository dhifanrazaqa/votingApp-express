class InternalServer extends Error {
  constructor (
    public errorCode: number = 500,
    public errorMessage: string,
    public errorDescription: string
  ) {
    super()

    this.errorCode = errorCode
    this.errorMessage = errorMessage
    this.errorDescription = errorDescription
  }
}

export default InternalServer
