import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
// import { ENVIRONMENT_NAMES } from "src/common/configuration/backend.config";
// import { ENV_VARS } from "src/common/constants/envs";
// import { GuardedRequest } from "src/common/types/request.types";
import * as winston from "winston";
import { encryptObject } from "./logger.encrypter";



@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private winstonLoggerErrorLevel = this.createSingleLineLogger("error");
  private winstonLoggerInfoLevel = this.createSingleLineLogger("info");

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
    return body;
    /*
    if (ENV_VARS.NODE_ENV === ENVIRONMENT_NAMES.PRODUCTION) {
      return encryptObject(ENV_VARS.LOGGER_RSA_KEY_PUBLIC, body);
    } else {
      return body;
    }
    */
  }

  use(request: Request, response: Response, next: NextFunction): void {
    // if (process.env.NODE_ENV !== ENVIRONMENT_NAMES.LOCAL) {
      const { ip, method, url, baseUrl, originalUrl } = request;
      request.originalUrl
      const userAgent = request.get("user-agent") || "";

      response.on("finish", () => {
        const { statusCode } = response;
        const contentLength = response.get("content-length");

        const basicRequestMetaInfo = {
          method,
          // baseUrl,
          // url,
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
            // user: request.user,
          };
          this.winstonLoggerErrorLevel.error({ ...basicRequestMetaInfo, ...additionalRequestMetaInfo });
        } else {
          this.winstonLoggerInfoLevel.info(basicRequestMetaInfo);
        }
      });
    // }
    next();
  }
}