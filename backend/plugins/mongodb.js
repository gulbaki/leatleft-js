import fp from 'fastify-plugin'
import mongodb from '@fastify/mongodb'

const location = {
  url: 'mongodb+srv://root:root@cluster0.so5im.mongodb.net/cms',
  name: 'location'
}

export default fp(async (fastify) => {
  fastify.register(mongodb, location)
})
