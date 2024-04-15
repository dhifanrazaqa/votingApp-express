import { type ISuccessResponse, type ICustomErrorResponse } from './responsesInterfaces'

import { type IUserJwtPayload, type IRequest, type IUserLoginPayload } from './authInterfaces'

import { type IUserPayload, type IUser } from './userInterfaces'

import { type IVotePayload, type IVote } from './voteInterfaces'

import { type IOptionPayload, type IOption } from './optionInterfaces'

import { type IJoinedVote } from './joinedVoteInterfaces'

import { type IAddVote, type ICountResult } from './addVoteInterfaces'

export type {
  ISuccessResponse,
  ICustomErrorResponse,
  IUserJwtPayload,
  IUserPayload,
  IUser,
  IRequest,
  IUserLoginPayload,
  IVotePayload,
  IVote,
  IOptionPayload,
  IOption,
  IJoinedVote,
  IAddVote,
  ICountResult
}
