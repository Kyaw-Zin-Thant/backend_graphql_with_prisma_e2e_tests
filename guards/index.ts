import { shield } from "graphql-shield"

import { isAuthorized } from './rules/index'

export const permissions = shield({
    Query: { },
    Mutation: {
    },
});