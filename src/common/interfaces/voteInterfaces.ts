export interface IVotePayload {
  title: string
  code: string
  authorId: string
  startAt: Date
  endAt: Date
}

export interface IVote extends IVotePayload {
  id: string
}
