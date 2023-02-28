export interface CustomError extends Error {
  statusCode: number;
  statusMessage: string;
}

// La clase HTTPError hereda e implementa una interfaz
export class HTTPError extends Error implements CustomError {
  constructor(
    public statusCode: number,
    public statusMessage: string,
    public message: string,
    public options?: ErrorOptions
  ) {
    super(message, options);
    this.name = 'HTTPError';
  }
}

/* Const e = new Error()
e. el error naivo de javascript tiene 4 metodos, en nuestra interface le metemos los que queramos extra, como estado, fecha, etc.. del error */
