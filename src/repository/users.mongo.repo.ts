import { HTTPError } from '../errors/error.js';
import { Repo } from './repo.interface.js';
import createDebug from 'debug';
import { User } from '../entities/user.js';
import { UserModel } from './user.mongo.model.js';
const debug = createDebug('W6:repo');

export class UsersMongoRepo implements Repo<User> {
  constructor() {
    debug('Instantiate');
  }

  async query(): Promise<User[]> {
    debug('query');
    // Sconst data = await UserModel.find();
    return [];
  }

  async queryId(id: string): Promise<User> {
    debug('queryId');
    const data = await UserModel.findById(id);
    if (!data) throw new HTTPError(404, 'Not found', 'ID not found in queryID');
    return data;
  }

  async search(query: { key: string; value: unknown }) {
    debug('search');
    const data = await UserModel.find({ [query.key]: query.value });
    // Data es un array que puede venir vacío o con el resultado de busqueda
    return data;
  }

  async create(info: Partial<User>): Promise<User> {
    debug('create');
    const data = await UserModel.create(info);
    return data;
  }

  async update(info: Partial<User>): Promise<User> {
    debug('update');
    const data = await UserModel.findByIdAndUpdate(info.id, info, {
      new: true,
    });
    if (!data) throw new HTTPError(404, 'Not found', 'ID not found in update');
    return data;
  }

  async destroy(id: string): Promise<void> {
    debug('destroy');
    const data = await UserModel.findByIdAndDelete(id);
    if (!data)
      throw new HTTPError(
        404,
        'Not found',
        'Delete not possible: id not found'
      );
  }
}
