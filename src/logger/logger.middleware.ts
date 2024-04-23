import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as winston from 'winston';
import { encryptObject } from './logger.encrypter';
import envConfig from '../config/env.config';
import loggerConfig from '../config/logger-middleware.config';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger(LoggerMiddleware.name);

  private config = envConfig();
  private loggerRSAKeyPublic: string = loggerConfig().LOGGER_RSA_KEY_PUBLIC;

  createSingleLineLogger(logLevel: string) {
    return winston.createLogger({
      level: logLevel,
      format: winston.format.json(),
      transports: [new winston.transports.Console()],
    });
  }

  isErroneousStatusCode(statusCode: number) {
    return statusCode >= 400 && statusCode < 600;
  }

  encryptRequestBodyOnProduction(body: object) {
    console.log('env: ', this.config.NODE_ENV);
    if (this.config.NODE_ENV === this.config.ENVS.PRODUCTION) {
      return encryptObject(this.loggerRSAKeyPublic, body);
    } else {
      return body;
    }
  }

  use(request: Request, response: Response, next: NextFunction): void {
    if (this.config.NODE_ENV !== this.config.ENVS.DEVELOPER) {
      const { ip, method, originalUrl } = request;
      request.originalUrl;
      const userAgent = request.get('user-agent') || '';

      response.on('finish', () => {
        const { statusCode } = response;
        const contentLength = response.get('content-length');

        const basicRequestMetaInfo = {
          method,
          originalUrl,
          ip,
          statusCode,
          contentLength,
          userAgent,
          timestamp: new Date(),
        };

        if (this.isErroneousStatusCode(statusCode)) {
          const additionalRequestMetaInfo = {
            body: this.encryptRequestBodyOnProduction(request.body),
            query: request.query,
            params: request.params,
            headers: request.headers,
            user: request['user'],
          };
          this.logger.error({
            ...basicRequestMetaInfo,
            ...additionalRequestMetaInfo,
          });
        } else {
          this.logger.log(basicRequestMetaInfo);
        }
      });
    }
    next();
  }
}
