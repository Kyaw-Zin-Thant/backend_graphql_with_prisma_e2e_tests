import { Resolvers } from 'generated/types'
import { Context } from '../../../libs/context'

export const mutation: Resolvers<Context>['Mutation'] = {
  createTask: async (_parent, { input }, ctx) => {
    const { title, status = 'INCOMPLETE', list ,order } = input
    await sortTasksOrder(order,list,ctx)
    return ctx.prisma.task.create({ data: { title, status, order, listId: list ?? '' } })
  },
  updateTask: async (_parent, { id, input }, ctx) => {
    await sortTasksOrder(input.order,input.listId,ctx)
    return ctx.prisma.task.update({
      where: { id },
      data: {
        title: input.title ?? undefined,
        status: input.status ?? undefined,
        order: input.order ?? undefined,
        listId: input.listId
      },
    })
  },
  deleteTask: async (_parent, { id }, ctx) => {
    ctx.prisma.task.delete({ where: { id } })
    return { success: true }
  },
  moveTask: async (_parent, { id, input }, ctx) => {
    const { order, listId } = input
    await sortTasksOrder(order,listId,ctx)
    await ctx.prisma.task.update({
      where: { id },
      data: {
        order: order,
        listId: listId
      },
    })
    return { success: true, message: "Successfully Updated" }
  }

}

const sortTasksOrder = async (order: any, listId: any, ctx: any) => {
  return ctx.prisma.task.updateMany({
    where: {
      listId: {
        equals: listId
      },
      order: {
        gt: (order - 1)
      }
    },
    data: { order: { increment: 1 } }
  })
}