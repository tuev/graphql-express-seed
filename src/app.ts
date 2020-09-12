import { BACKGROUND_COLOR_LOG, COLOR_LOG } from './common/constant/config'
import express from 'express'
import createExpressApp from './configs/expressConfig'
import createGraphQLServer from './configs/graphQLConfig'
import chalk from 'chalk'
import typeDefs from './typeDefs'
import resolvers from './resolvers'

/* ------------------------------ SETUP EXPRESS ----------------------------- */

const app = createExpressApp(express())

/* ------------------------------ SETUP GRAPHQL ----------------------------- */

const graphQLServer = createGraphQLServer(app, { typeDefs, resolvers })

app.listen(app.get('port'), () => {
  const PORT = process.env.PORT || 4000
  const graphqlPath = `http://localhost:${PORT}${graphQLServer.graphqlPath}`
  const graphqlSocketPath = `ws://localhost:${PORT}${graphQLServer.subscriptionsPath}`
  const expressPath = `http://localhost:${PORT}`

  const logPath = chalk.bgHex(BACKGROUND_COLOR_LOG).hex(COLOR_LOG)
  console.log('🚀 Subscriptions ready at %s', logPath(graphqlSocketPath))
  console.log('🚀 GraphQL Server ready at %s', logPath(graphqlPath))
  console.log('🚀 Express Server ready at %s', logPath(expressPath))
})

export default app
