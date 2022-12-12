import { Resolvers } from 'generated/types'
import { Context } from '../../../libs/context'

export const mutation: Resolvers<Context>['Mutation'] = {
  createList: async (_parent, { input }, ctx) => ctx.prisma.list.create({ data: { title: input.title ?? '' } }),
  updateList: async (_parent, { id, input }, ctx) =>
    ctx.prisma.list.update({
      where: { id },
      data: {
        title: input.title ?? undefined,
      },
    }),
  deleteList: async (_parent, { id }, ctx) => {
    await ctx.prisma.list.delete({ where: { id } })
    return { success: true }
  }
}
