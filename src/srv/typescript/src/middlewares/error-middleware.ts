import type express from 'express';
import { AppError } from 'openapi-ts-router';
import { type components } from '../gen/v1/schema';

export function errorMiddleware(
  err: unknown,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction
): void {
  let statusCode = 500;
  const jsonResponse: components['schemas']['Error'] = {
    error_code: '#ERR_UNKNOWN',
    error_message: null,
  };

  // Handle application-specific errors (instances of AppError)
  if (err instanceof AppError) {
    statusCode = err.status;
    jsonResponse.error_code = err.code;
  }

  // Handle unknown errors
  else if (typeof err === 'object' && err != null) {
    if ('message' in err && typeof err.message === 'string') {
      jsonResponse.error_message = err.message;
    }
    if ('code' in err && typeof err.code === 'string') {
      jsonResponse.error_code = err.code;
    }
  } else {
    jsonResponse.error_message = 'An unknown error occurred!';
  }

  res.status(statusCode).json(jsonResponse);
}
