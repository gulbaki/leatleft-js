
const getLocationsSchema = {
  tags: ['Get Locations'],
  description: 'GET Locations'

}

const deleteLocationsSchema = {
  tags: ['Get Location'],
  description: 'GET Location',
  params: {
    type: 'object',
    additionalProperties: false,
    properties: {
      id: {
        type: 'number'
      }
    },
    required: ['id']

  }

}

const addLocationsSchema = {
  tags: [' Location DATA endpoint'],
  description: 'ADD Location ',
  body: {
    type: 'object',
    additionalProperties: false,
    properties: {
      __id: {
        type: 'integer'
      },
      date: {
        type: 'string',
        format: 'date-time',
        default: new Date()
      },
      loc: {
        type: 'array',
        maxItems: 2,
        items: { type: 'number' },
        default: [34, 27]
      }
    }
  }
}

export const Schemas = {
  AddLocations: addLocationsSchema,
  GetLocations: getLocationsSchema,
  DeleteLocations: deleteLocationsSchema

}
