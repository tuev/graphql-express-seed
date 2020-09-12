import { BACKGROUND_COLOR_LOG, COLOR_LOG } from './../common/constant/config'
import { ApolloServer, ApolloServerExpressConfig } from 'apollo-server-express'
import { Application } from 'express'
import { createServer } from 'http2'
import { merge } from 'lodash'
import { PubSub } from 'graphql-subscriptions'
import depthLimit from 'graphql-depth-limit'
import chalk from 'chalk'

/**
 * Pubsub can be replaced by some below method:
 * - Redis
 * - Google PubSub
 * - MQTT enabled broker
 * - RabbitMQ
 * - Kafka
 * - Postgres
 * - Google Cloud Firestore
 *  ref: https://www.apollographql.com/docs/apollo-server/features/subscriptions/#subscriptions-example
 */

export const pubsub = new PubSub()
const logConsole = chalk.bgHex(BACKGROUND_COLOR_LOG).hex(COLOR_LOG)

const createGraphQLServer = (
  app: Application,
  configs: ApolloServerExpressConfig
): ApolloServer => {
  const graphQLServer = new ApolloServer(
    merge(configs, {
      context: (req: Request) => ({ ...req, pubsub }),
      validationRules: [depthLimit(3)],
      subscriptions: {
        onConnect: () => {
          // TODO: add authorization wsToken on connectionParams
          logConsole('🚀 ws on connect')
        },
        onDisconnect: () => {
          logConsole('🚀 ws onDisconnect ')
        },
      },
    })
  )

  graphQLServer.applyMiddleware({ app })
  const server = createServer(app)
  graphQLServer.installSubscriptionHandlers(server)

  return graphQLServer
}

export default createGraphQLServer
