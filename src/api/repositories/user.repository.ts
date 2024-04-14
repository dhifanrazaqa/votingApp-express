import { PrismaClient } from '@prisma/client'
import { type IUser, type IUserPayload } from '../../common/interfaces'

const prisma = new PrismaClient()

const insertUser = async (userData: IUserPayload): Promise<IUser> => {
  const user = await prisma.user.create({
    data: {
      email: userData.email,
      name: userData.name,
      password: userData.password,
      role: userData.role
    }
  })

  return user
}

const findUserByEmail = async (email: string): Promise<IUser | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  return user
}

const findUserById = async (id: string): Promise<IUser | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id
    }
  })

  return user
}

const findAllUsers = async (): Promise<IUser[] | []> => {
  const users = await prisma.user.findMany()

  return users
}

export {
  insertUser,
  findUserByEmail,
  findUserById,
  findAllUsers
}
