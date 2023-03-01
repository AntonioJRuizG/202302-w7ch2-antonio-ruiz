import { model, Schema } from 'mongoose';
import { Thing } from '../entities/thing';

const thingSchema = new Schema<Thing>({
  name: {
    type: String,
    requiered: true,
    unique: true,
  },
  interestingScore: {
    type: Number,
    requierd: true,
    min: 0,
    max: 10,
  },
  importantScore: {
    type: Number,
    requierd: true,
    min: 0,
    max: 10,
  },
});

thingSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
    delete returnedObject.password; // Mecanismo de seguridad que evita sacar pw hacia fuera
  },
});

export const ThingModel = model('Thing', thingSchema);
