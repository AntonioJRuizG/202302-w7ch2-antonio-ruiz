import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { thingsRouter } from './routers/things.router.js';
import { CustomError } from './errors/error.js';
import createDebug from 'debug';
const debug = createDebug('W6:app');
export const app = express();
app.disable('x-powered-by');

const corsOptions = {
  origin: '*',
};
app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));

app.use(express.static('public'));

app.use((_req, _resp, next) => {
  debug('Soy un middleware');
  next();
});

app.use('/things', thingsRouter);

app.get('/', (_req, resp) => {
  resp.json({
    info: 'Bootcamp API',
    endpoints: { things: '/things' },
  });
});

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (error: CustomError, _req: Request, resp: Response, _next: NextFunction) => {
    debug('Errors middleware');
    const status = error.statusCode || 500;
    const statusMessage = error.statusMessage || 'Internal server error';
    resp.status(status);
    resp.json({
      error: [
        {
          status,
          statusMessage,
        },
      ],
    });
  }
);
