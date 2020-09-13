import { BACKGROUND_COLOR_LOG, COLOR_LOG } from './common/constant/config'
import express from 'express'
import createExpressApp from './configs/expressConfig'
import createGraphQLServer from './configs/graphQLConfig'
import chalk from 'chalk'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import { createServer } from 'http'
import createHealthCheck from './configs/healthCheckConfig'
import createGracefulTerminator from './configs/gracefulConfig'

/* ------------------------------ SETUP EXPRESS ----------------------------- */

const PORT = process.env.PORT || 4000

const app = createExpressApp(express(), { port: PORT })

/* ------------------------------ SETUP SERVER ------------------------------ */

const server = createServer(app)

/* ------------------------------ SETUP GRAPHQL ----------------------------- */

const graphQLServer = createGraphQLServer(app, server, { typeDefs, resolvers })

/* ---------------------------- GRACEFUL SHUTDOWN --------------------------- */

const gracefulShutdown = createGracefulTerminator(server)

/* ------------------------------ HEALTH CHECK ------------------------------ */

const healthCheck = createHealthCheck(server,
  { port: +PORT },
  gracefulShutdown.terminate)

/* ------------------------------ START SERVER ------------------------------ */

app.listen(app.get('port'), () => {
  const graphqlPath = `http://localhost:${PORT}${graphQLServer.graphqlPath}`
  const graphqlSocketPath = `ws://localhost:${PORT}${graphQLServer.subscriptionsPath}`
  const expressPath = `http://localhost:${PORT}`

  const logPath = chalk.bgHex(BACKGROUND_COLOR_LOG).hex(COLOR_LOG)
  console.log('🚀 Subscriptions ready at %s', logPath(graphqlSocketPath))
  console.log('🚀 GraphQL Server ready at %s', logPath(graphqlPath))
  console.log('🚀 Express Server ready at %s', logPath(expressPath))
  healthCheck.isServerReady()
})

export default app
