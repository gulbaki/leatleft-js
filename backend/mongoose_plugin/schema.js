import mongoose from 'mongoose'
const Schema = mongoose.Schema
// const ObjectId = Schema.Types.ObjectId
export const Now = () => Date.now()

export const LocationSchema = new Schema({

  __id: { type: Number, required: true, unique: true },
  date: { type: Date, default: Date.now(), required: true },
  status: { type: Number, min: 0, max: 999, default: 0, required: true },
  loc: {
    type: { type: String },
    coordinates: [Number]

  }

},
{
  timestamps: true
})

LocationSchema.index({ loc: '2dsphere' })
