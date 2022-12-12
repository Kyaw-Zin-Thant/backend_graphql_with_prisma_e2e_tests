import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    order: Int!
  }

  type Tasks {
    id: ID!
    title: String!
    order: Int!
    list: List
  }

  type List{
    id: ID!,
    title: String!
  }

  input CreateTaskInput {
    title: String!
    list: String
    status: String!
    order:Int!
  }
 
  input UpdateTaskInput {
    title: String
    status: String
    order: Int
    listId: String
  } 

  input MoveTaskInput {
    listId: String!
    order: Int!
  } 

  type MutationResult {
    success: Boolean!
  }

  type MoveTaskResult {
    success: Boolean!,
    message: String!
  }

  type Query {
    tasks: [Tasks!]!
    task(id: ID!): Task
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task!
    updateTask(id: ID!, input: UpdateTaskInput!): Task
    deleteTask(id: ID!): MutationResult!
    moveTask(id: ID!,input: MoveTaskInput!): MoveTaskResult!
  }
`
