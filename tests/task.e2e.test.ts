import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";
import request from "supertest"
import { resolvers } from '../services/task/resolvers'
import { typeDefs } from '../services/task/resolvers/schema'
import { createContext } from '../libs/context'

describe("a GraphQL based HTTP request", () => {
    let app: express.Application;
    let httpServer: http.Server;
    let server: any;
    let listId = "306830b2-257d-45f0-af59-6faad18e273a"; //update data from db
    let moveListId = "ecc1d742-03f9-4b22-b436-b78f563a467d";
    let updateTaskId:any;

    describe("POST /graphql", () => {
        beforeAll(async () => {
            app = express();
            httpServer = http.createServer(app);
            server = new ApolloServer({
                typeDefs,
                resolvers,
                context: ctx => createContext(ctx),
            })

            await server.start();
            server.applyMiddleware({ app });
        });

        afterAll(async () => {
            await server.stop();
        });

        it("should created task successfully", async () => {
            const queryData = {
                query: `mutation CreateTask($createTaskInput2: CreateTaskInput!) {
                    createTask(input: $createTaskInput2) {
                      id
                      title
                    }
                  }`,
                variables: {
                    "createTaskInput2": {
                        "list": listId,
                        "status": "INCOMPLETE", // optional
                        "title": "DB DESIGN MODEL",
                        // "order":3
                    },
                },
            };

            const response = await request(httpServer).post("/graphql").send(queryData);
            updateTaskId = response.body.data.createTask.id;
            expect(response.statusCode).toBe(200);
            expect(response.body.data.createTask.title).toEqual("DB DESIGN MODEL")
        });

        it("should return task data array", async () => {
            const queryData = {
                query: `query Tasks {
                    tasks {
                      id
                      order
                      title
                      list {
                        id
                        title
                      }
                    }
                  }`,
                variables: {},
            };

            const response = await request(httpServer).post("/graphql").send(queryData);
            expect(response.statusCode).toBe(200)
            expect(response.body.data.tasks).toEqual(expect.arrayContaining(
                [expect.objectContaining({ title: 'DB DESIGN MODEL' })]
            ));
        });

        it("should update task successfully", async () => {
            const queryData = {
                query: `mutation UpdateTask($updateTaskInput2: UpdateTaskInput!, $updateTaskId: ID!) {
                    updateTask(input: $updateTaskInput2, id: $updateTaskId) {
                      id
                      order
                      title
                    }
                  }`,
                variables: {
                    "updateTaskId": updateTaskId,
                    "updateTaskInput2": {
                        "listId": listId,
                        "order": 2,
                        "status": "INPROGRESS",
                        "title": "DB DESIGN MODEL"
                    },
                },
            };

            const response = await request(httpServer).post("/graphql").send(queryData);
            expect(response.statusCode).toBe(200);
            expect(response.body.data.updateTask.title).toEqual("DB DESIGN MODEL")
        });

        it("should move task successfully", async () => {
            const queryData = {
                query: `mutation MoveTask($moveTaskInput2: MoveTaskInput!, $moveTaskId: ID!) {
                    moveTask(input: $moveTaskInput2, id: $moveTaskId) {
                      success
                      message
                    }
                  }`,
                variables: {
                    "moveTaskInput2": {
                        "listId": moveListId,
                        "order": 2
                      },
                      "moveTaskId": updateTaskId,
                },
            };

            const response = await request(httpServer).post("/graphql").send(queryData);
            expect(response.statusCode).toBe(200);
           
        });
    });
});