-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "tasks" TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);


CREATE TABLE "List" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "tasks" TEXT[],
    "order" INTEGER NOT NULL,

    CONSTRAINT "List_pkey" PRIMARY KEY ("id")
);


CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "listId" TEXT NULL,
    "order"  INTEGER NOT NULL,
    "userId" TEXT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

