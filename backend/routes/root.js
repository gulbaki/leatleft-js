export default async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    // const users = this.mongoose.db.collection('url');
    return { root: true }
  })
}
