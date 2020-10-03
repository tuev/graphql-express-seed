import { ApolloServer, ApolloServerExpressConfig } from 'apollo-server-express'
import { Request, Application } from 'express'

import { merge } from 'lodash'
import { PubSub } from 'graphql-subscriptions'
import depthLimit from 'graphql-depth-limit'
import chalk from 'chalk'
import { BACKGROUND_COLOR_LOG, COLOR_LOG } from './../common/constant/config'
import schema from '../schema'

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

const createGraphQLServer = (app: Application,
  configs: ApolloServerExpressConfig = {}): ApolloServer => {
  const graphQLServer = new ApolloServer(merge({
        schema,
        tracing: true,
        cacheControl: true,
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
      },
      configs))

  graphQLServer.applyMiddleware({ app })
  return graphQLServer
}

export default createGraphQLServer
