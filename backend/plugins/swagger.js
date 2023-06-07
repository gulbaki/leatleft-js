import fp from 'fastify-plugin'
import swagger from '@fastify/swagger'

// const FASTIFY_MONGODB = process.env.FASTIFY_ADDRESS;

const options = {
  routePrefix: '/api/docs',
  exposeRoute: true,
  swagger: {
    info: {
      title: 'Search service api',
      description: 'Building a blazing fast REST API with Node.js Fastify and Swagger',
      version: '1.0.0'
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here'
    },
    // host: '127.0.0.1:4001',
    // schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
      authorization: {
        type: 'apiKey',
        name: 'authorization',
        in: 'header'
      }
    },
    security: [{
      authorization: []
    }]

  }
}

export default fp(async (fastify) => {
  fastify.register(swagger, options)
})
