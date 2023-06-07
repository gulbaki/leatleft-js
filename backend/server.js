'use strict'

// Read the .env file.
import os from 'os'
import cluster from 'cluster'

import * as dotenv from 'dotenv'

// Require the framework
import Fastify from 'fastify'

// Require library to exit fastify process, gracefully (if possible)
import closeWithGrace from 'close-with-grace'

// Register your application as a normal plugin.
import appService from './app.js' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

// Instantiate Fastify with some config
const app = Fastify({
  bodyLimit: 1128093857,
  logger: false,
  disableRequestLogging: true
})

const clusterWorkerSize = os.cpus().length

app.register(appService)

// delay is the number of milliseconds for the graceful close to finish
const closeListeners = closeWithGrace({ delay: process.env.FASTIFY_CLOSE_GRACE_DELAY || 500 }, async function ({ signal, err, manual }) {
  if (err) {
    app.log.error(err)
  }
  await app.close()
})

app.addHook('onClose', async (instance, done) => {
  closeListeners.uninstall()
  done()
})

const start = async () => {
  app.listen({ port: process.env.FASTIFY_PORT || 3000 }, (err) => {
    if (err) {
      app.log.error(err)
      process.exit(1)
    }
  })
}

if (clusterWorkerSize > 1) {
  if (cluster.isPrimary) {
    for (let i = 0; i < clusterWorkerSize; i++) {
      cluster.fork()
    }

    cluster.on('exit', function (worker) {
      console.log('Worker', worker.id, ' has exited.')
    })
  } else {
    start()
  }
} else {
  start()
}
// Start listening.
