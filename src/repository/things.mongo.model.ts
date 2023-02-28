import { model, Schema } from 'mongoose';
import { Thing } from '../entities/thing';

const thingSchema = new Schema<Thing>({
  name: {
    type: String,
    // Criteros de validacion
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

export const ThingModel = model('Thing', thingSchema);
