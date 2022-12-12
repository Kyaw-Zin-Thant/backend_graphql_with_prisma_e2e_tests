import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";
import request from "supertest"
import { resolvers } from '../services/list/resolvers'
import { typeDefs } from '../services/list/resolvers/schema'
import { createContext } from '../libs/context'

describe("a GraphQL based HTTP request", () => {
    let app: express.Application;
    let httpServer: http.Server;
    let server: any;


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

        it("should created list successfully", async () => {
            const queryData = {
                query: `mutation CreateList($createListInput2: CreateListInput!) {
            createList(input: $createListInput2) {
              id
              title
            }
          }`,
                variables: {
                    "createListInput2": {
                        "title": "TEST ONE"
                    },
                },
            };

            const response = await request(httpServer).post("/graphql").send(queryData);
            expect(response.statusCode).toBe(200);
            expect(response.body.data.createList.title).toEqual("TEST ONE")
        });

        it("should return list data array", async () => {
            const queryData = {
                query: `query Lists {
            lists {
              id
              title
              tasks {
                id
                title
              }
            }
          }`,
                variables: {},
            };

            const response = await request(httpServer).post("/graphql").send(queryData);

            expect(response.statusCode).toBe(200)
            expect(response.body.data.lists).toEqual(expect.arrayContaining(
                [expect.objectContaining({ title: 'TEST ONE' })]
            ));
        });
    });
});