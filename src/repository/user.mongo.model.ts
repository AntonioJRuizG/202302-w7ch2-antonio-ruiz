import { model, Schema } from 'mongoose';
import { User } from '../entities/user';

const userSchema = new Schema<User>({
  email: {
    type: String,
    requiered: true,
    unique: true,
  },
  password: {
    type: String,
    requierd: true,
  },
});

userSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
    delete returnedObject.password; // Mecanismo de seguridad que evita sacar pw hacia fuera
  },
});

export const UserModel = model('User', userSchema, 'users');
