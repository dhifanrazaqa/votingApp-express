export interface IAddVote {
  voteId: string
  userId: string
  optionId: string
}

export interface ICountResult {
  _count: object
  optionId: string
}
