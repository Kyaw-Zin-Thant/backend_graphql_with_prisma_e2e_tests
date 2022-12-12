import { Resolvers } from 'generated/types'
import { Context } from '../../../libs/context'
import { hashPassword, verifyPassword, signToken } from '../../../utils/index'

export const mutation: Resolvers<Context>['Mutation'] = {
  createUser: async (_parent, { input }, ctx) => {
    const { password } = input
    //hashing password
    const hashedPassword = await hashPassword(password)
    input.password = hashedPassword

    return ctx.prisma.user.create({ data: input })
  },
  updateUser: async (_parent, { id, input }, ctx) =>
    {
      return ctx.prisma.user.update({
        where: { id },
        data: {
          username: input.username ?? 'undefined',
        },
      })
    },
  loginUser: async (_parent, { input }, ctx) => {
    const { username, password } = input
    const user = await ctx.prisma.user.findFirst({ where: { username: username ?? undefined } });
    const isValidPassword = await verifyPassword(user?.password ?? '', password);

    if (!isValidPassword) {
      throw new Error("Invalid password");
    }

    return {
      id: user?.id ?? '',
      username: user?.username ?? '',
      token: signToken({ userId: user?.id ?? '' }),
    };
  }
}
