import fp from 'fastify-plugin'
import cors from '@fastify/cors'

const options = {
  origin: '*',

  allowedHeaders: [
    'Access-Control-Allow-Origin',
    'Origin',
    'X-Requested-With',
    'Accept',
    'Content-Type',
    'Authorization'
  ],
  exposedHeaders: 'Content-Disposition',
  methods: 'GET,PUT,POST,DELETE'
}

export default fp(async (fastify) => {
  fastify.register(cors, {
    options
    // hideOptionsRoute: true,
    // preflight: false

  })
})
