
import fp from 'fastify-plugin'
import mongoose from 'mongoose'
import * as schema from './schema.js'

const NODE_ENV = process.env.NODE_ENV

const FastifyMongoose = async function (fastify, options) {
  if (fastify.mongoose) {
    throw Error('fastify-mongosee has already registered.')
  }

  const mongodbOptions = options.mongodb.default

  const defaultConn = await mongoose.connect(mongodbOptions.host, mongodbOptions.options).catch(err => {
    fastify.log.error(`conection error !.. err: ${err}`)
    return false
  })

  if (NODE_ENV === '') {
    mongoose.set('debug', true)
  }

  if (defaultConn === false) {
    fastify.mongoose = undefined
    throw Error('fastify-mongosee connection error!')
  }

  const location = await defaultConn.model('Location', schema.LocationSchema, 'location')

  const mongo = {
    conn: defaultConn,
    models: {
      location
    }

  }

  if (!fastify.mongoose) {
    fastify.decorate('mongoose', mongo)
  }
}

export default fp(FastifyMongoose, {
  fastify: '4.x',
  name: 'fastifymongoose'
})
