import {
  createLightship,
  ConfigurationInputType,
  LightshipType,
} from 'lightship'
import { Server as HttpServer } from 'http'
import { Http2Server, Http2SecureServer } from 'http2'
import { Server as HttpsServer } from 'https'
import WebSocket from 'ws'
import merge from 'lodash/merge'

const createHealthCheck = (server:
    | HttpServer
    | HttpsServer
    | Http2Server
    | Http2SecureServer
    | WebSocket.Server,
  configs?: ConfigurationInputType,
  shutdownHandler?: Function): LightshipType => {
  const lightship = createLightship(merge({
        detectKubernetes: true,
      },
      configs))
  const shutdownCallback = shutdownHandler || server.close
  lightship.registerShutdownHandler(() => {
    shutdownCallback()
  })

  return lightship
}

export default createHealthCheck
