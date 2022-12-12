/*
  Warnings:

  - You are about to drop the column `tasks` on the `List` table. All the data in the column will be lost.
  - You are about to drop the column `tasks` on the `User` table. All the data in the column will be lost.
  - Made the column `userId` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
CREATE SEQUENCE "list_order_seq";
ALTER TABLE "List" DROP COLUMN "tasks",
ALTER COLUMN "order" SET DEFAULT nextval('list_order_seq');
ALTER SEQUENCE "list_order_seq" OWNED BY "List"."order";

-- AlterTable
CREATE SEQUENCE "task_order_seq";
ALTER TABLE "Task" ALTER COLUMN "order" SET DEFAULT nextval('task_order_seq'),
ALTER COLUMN "userId" SET NOT NULL;
ALTER SEQUENCE "task_order_seq" OWNED BY "Task"."order";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "tasks";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
