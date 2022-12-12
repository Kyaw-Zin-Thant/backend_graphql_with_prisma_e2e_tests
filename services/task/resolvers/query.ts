import { Resolvers } from 'generated/types'
import { Context } from '../../../libs/context'

export const query: Resolvers<Context>['Query'] = {
  tasks: async (_parent, _args, ctx) => ctx.prisma.task.findMany({include:{list:true}}),
  task: async (_parent, { id }, ctx) =>
    ctx.prisma.task.findUnique({
      where: { id },
    }),
}
