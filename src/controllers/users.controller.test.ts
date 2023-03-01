import { Response, Request } from 'express';
import { User } from '../entities/user';
import { HTTPError } from '../errors/error';
import { Repo } from '../repository/repo.interface';
import { UsersController } from './users.controller';

describe('Given UsersController', () => {
  const repo: Repo<User> = {
    create: jest.fn(),
    query: jest.fn(),
    search: jest.fn(),
    queryId: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  };

  const req = {
    body: {},
    params: { id: '' },
  } as unknown as Request;
  const resp = {
    json: jest.fn(),
    status: jest.fn(), // Moquear status tb
  } as unknown as Response;

  const next = jest.fn();

  const controller = new UsersController(repo);

  describe('Given register method', () => {
    test('Then it should be called if there are NOT errors', async () => {
      req.body.email = 'email';
      req.body.password = 'pw';
      await controller.register(req, resp, next);

      expect(repo.create).toHaveBeenCalled();
      expect(resp.status).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then if there are an error, it should be called and then catch should call next()', async () => {
      (repo.create as jest.Mock).mockRejectedValue(new Error());
      await controller.register(req, resp, next);
      expect(repo.create).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });

    test('Then it should throw an error if email or password not exist', async () => {
      req.body.email = 76;
      req.body.password = null;
      const result = await controller.register(req, resp, next);
      console.log(result);
      expect(result).rejects.toBeInstanceOf(HTTPError);
      //expect(result).rejects.toThrow();
    });
  });

  describe('Given the login method', () => {
    test('Then it should be called if there are no errors', async () => {
      req.body.email = 'email';
      req.body.password = 'pw';
      await controller.login(req, resp, next);

      expect(repo.search).toHaveBeenCalled();
      expect(resp.status).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then if there are an error, it should be called and then catch should call next()', async () => {
      (repo.search as jest.Mock).mockRejectedValue(new Error());
      await controller.login(req, resp, next);
      expect(repo.search).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
});
