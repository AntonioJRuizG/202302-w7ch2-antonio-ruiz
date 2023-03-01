import { Thing } from '../entities/thing';
import { HTTPError } from '../errors/error.js';
import { Repo } from './repo.interface';
import { ThingModel } from './things.mongo.model.js';
import createDebug from 'debug';
const debug = createDebug('W6:repo');

export class ThingsMongoRepo implements Repo<Thing> {
  constructor() {
    debug('Instantiate');
  }

  // Esto lo traemos aqui como funcionalidad extra, porque en el users repo es necesario
  async search(query: { key: 'string'; value: unknown }) {
    debug('search');
    const data = await ThingModel.find({ [query.key]: query.value });
    // Data es un array que puede venir vacío o con el resultado de busqueda
    return data;
  }

  async query(): Promise<Thing[]> {
    debug('query');
    const data = await ThingModel.find();
    return data;
  }

  async queryId(id: string): Promise<Thing> {
    debug('queryId');
    const data = await ThingModel.findById(id);
    if (!data) throw new HTTPError(404, 'Not found', 'ID not found in queryID');
    return data;
  }

  async create(info: Partial<Thing>): Promise<Thing> {
    debug('create');
    const data = await ThingModel.create(info);
    return data;
  }

  async update(info: Partial<Thing>): Promise<Thing> {
    debug('update');
    const data = await ThingModel.findByIdAndUpdate(info.id, info, {
      new: true,
    });
    if (!data) throw new HTTPError(404, 'Not found', 'ID not found in update');
    return data;
  }

  async destroy(id: string): Promise<void> {
    debug('destroy');
    const data = await ThingModel.findByIdAndDelete(id);
    if (!data)
      throw new HTTPError(
        404,
        'Not found',
        'Delete not possible: id not found'
      );
  }
}
