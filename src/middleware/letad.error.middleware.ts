import {injectable, Provider} from '@loopback/core';
import {
  asMiddleware,
  HttpErrors,
  Middleware,
  MiddlewareContext,
  Response,
} from '@loopback/rest';

@injectable(
  asMiddleware({
    // group: 'validationError',
    // upstreamGroups: RestMiddlewareGroups.SEND_RESPONSE,
    // downstreamGroups: RestMiddlewareGroups.CORS,
  }),
)
export class ErrorHandlerMiddlewareProvider implements Provider<Middleware> {
  constructor() {}

  async value() {
    const middleware: Middleware = async (ctx, next) => {
      try {
        return await next();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.statusCode === 500) {
          Object.assign(error, {statusCode: 400});
          Object.assign(error, {
            message: {
              reason: error.message,
            },
          });
        }
        return this.handleError(ctx, error);
      }
    };
    return middleware;
  }
  async handleError(
    context: MiddlewareContext,
    error: HttpErrors.HttpError,
  ): Promise<Response | undefined> {
    console.log('middleware-error', JSON.stringify(error));
    if (error.statusCode === 400) {
      context.response.status(400).send({
        test: 'working',
        message: error,
      });
      return;
    }
    if (error.statusCode === 500) {
      context.response.status(400).send({
        test: 'internal working',
      });
      return;
    }
    throw error;
  }
}
