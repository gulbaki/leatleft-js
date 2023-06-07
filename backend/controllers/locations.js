import { ObjectId } from 'mongodb';

const getLocationsHandler = async function (req, reply) {
  const LocationTable = this.mongo.location.db.collection('locations')
  const locations = await LocationTable.find().toArray()
  return reply.code(200).send(locations)
}
const addLocationsHandler = async function (req, reply) {
  const { loc, date, __id } = req.body
  const LocationTable = this.mongo.location.db.collection('locations')

  const geo = { type: 'Point', coordinates: loc }

  try {
    const location = await LocationTable.insert({ __id, geo, date })

    reply.code(201).send({ id: location.insertedIds[0] })
  } catch (err) {
    reply.code(409).send({ err })
  }
}

const deleteLocationsHandler = async function (req, reply) {
  const LocationTable = this.mongo.location.db.collection('locations')

  try {
    const location = await LocationTable.deleteOne({ _id: new ObjectId(req.params.id) })
    reply.code(200).send({ Location: location._id })
  } catch (err) {
    console.log(err)
    reply.code(500).send({ err })
  }
}

const exportLocationsHandler = async function (req, reply) {
  const LocationTable = this.mongo.location.db.collection('locations')

  try {
    const locations = await LocationTable.find().toArray()
    reply.header('Content-disposition', 'attachment; filename=' + 'locations.json')
    reply.type('application/json')
    reply.send(locations)
    return reply.code(200).send(locations)
  } catch (error) {

  }
}

export const Controller = {
  Handlers: {
    GetLocations: getLocationsHandler,
    AddLocations: addLocationsHandler,
    DeleteLocations: deleteLocationsHandler,
    ExportLocations: exportLocationsHandler
  }
}
