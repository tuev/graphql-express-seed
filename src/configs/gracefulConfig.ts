import {
  createHttpTerminator,
  HttpTerminator,
  HttpTerminatorConfig,
} from 'http-terminator'
import { Server as HttpServer } from 'http'
import { Server as HttpsServer } from 'https'
import merge from 'lodash/merge'

const createGracefulTerminator = (server: HttpServer | HttpsServer,
  config?: HttpTerminatorConfig): HttpTerminator => {
  const httpTerminator = createHttpTerminator(merge({ server }, config || {}))

  return httpTerminator
}

export default createGracefulTerminator
