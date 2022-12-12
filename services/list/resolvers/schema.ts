import { gql } from 'apollo-server'

export const typeDefs = gql`
  type List {
    id: ID!
    title: String!
  }

  type Lists {
    id: ID!
    title: String!
    tasks: [Task]
  }

  type Task {
    id: ID!
    title: String!
    order: Int!
  }

  input CreateListInput {
    title: String!
  }
 
  input UpdateListInput {
    title: String!
  } 

  type MutationResult {
    success: Boolean!
  }

  type Query {
    lists: [Lists!]!
    list(id: ID!): List
  }

  type Mutation {
    createList(input: CreateListInput!): List!
    updateList(id: ID!, input: UpdateListInput!): List
    deleteList(id: ID!): MutationResult!
  }
`
