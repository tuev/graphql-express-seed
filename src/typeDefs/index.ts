import { gql } from 'apollo-server-express'

/* --------------------------- TYPE FOR MODULE -------------------------- */

/* ------------------------- DEFINE GRAPHQL TYPEDEF ------------------------ */

const baseType = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`
const typeDefs = [baseType]

export default typeDefs
