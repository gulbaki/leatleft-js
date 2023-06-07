import { Controller } from '../../controllers/locations.js'
import { Schemas } from '../../schemas/locations.js'
export default async function (fastify, opts) {
  fastify.post('/add', { schema: Schemas.AddLocations }, Controller.Handlers.AddLocations)
  fastify.get('/get', { schema: Schemas.GetLocations }, Controller.Handlers.GetLocations)
  fastify.delete('/delete/:id', { schema: Schemas.DeleteLocations }, Controller.Handlers.DeleteLocations)
  fastify.get('/export', { }, Controller.Handlers.ExportLocations)
}
