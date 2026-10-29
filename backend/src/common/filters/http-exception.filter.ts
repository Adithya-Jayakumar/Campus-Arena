import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as Sentry from '@sentry/node';

/**
 * Module IV.4 & IV.5: Error Tracking & Performance Optimization using Sentry
 * Intercepts unhandled and HTTP exceptions, logs to Winston, and pushes breadcrumbs/errors to Sentry
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('AllExceptionsFilter');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Support GraphQL contexts safely where request/response might differ
    if (!response || typeof response.status !== 'function') {
      this.logger.error('Unhandled GraphQL/RPC Exception', exception as any);
      return;
    }

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    // Report unexpected 5xx crashes to Sentry
    if (status >= 500) {
      this.logger.error(`[500 Internal Error] ${request.method} ${request.url}`, exception as any);
      if (process.env.SENTRY_DSN) {
        Sentry.captureException(exception);
      }
    } else {
      this.logger.warn(`[${status}] ${request.method} ${request.url} - ${JSON.stringify(message)}`);
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      error: typeof message === 'object' ? message : { message },
    });
  }
}
