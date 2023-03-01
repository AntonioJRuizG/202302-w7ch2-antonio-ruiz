import { Response, Request, NextFunction } from 'express';
import { Repo } from '../repository/repo.interface.js';
import { Thing } from '../entities/thing.js';
import createDebug from 'debug';
const debug = createDebug('W6:controller');
export class ThingsController {
  // eslint-disable-next-line no-useless-constructor
  constructor(public repo: Repo<Thing>) {}

  async getAll(_req: Request, resp: Response, next: NextFunction) {
    try {
      debug('getAll');
      const data = await this.repo.query();
      resp.json({
        results: data,
      });
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('get');
      const data = await this.repo.queryId(req.params.id);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async post(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('post');
      const data = await this.repo.create(req.body);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async patch(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('patch');
      req.body.id = req.params.id ? req.params.id : req.body.id;
      const data = await this.repo.update(req.body);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('delete');
      await this.repo.destroy(req.params.id);
      // El destroy no es asincrono, porque no esperamos que devuelva nada de la base de datos. Pero el await hace que en caso de fallar el destroy, lance un error si la promesa no se resuelve positivamente
      resp.json({
        results: [],
      });
    } catch (error) {
      next(error);
    }
  }
}
