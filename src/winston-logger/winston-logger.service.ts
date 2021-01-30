import { Inject, Injectable, Scope } from '@nestjs/common';
import * as winston from 'winston';
import { WinstonLoggerModuleOptions } from './interfaces';
import { WINSTON_LOGGER_MODULE_OPTIONS } from './winston-logger.constants';

@Injectable({ scope: Scope.TRANSIENT })
export class WinstonLoggerService {
  private logger: winston.Logger;
  private context = '';

  constructor(
    @Inject(WINSTON_LOGGER_MODULE_OPTIONS)
    private options: WinstonLoggerModuleOptions,
  ) {
    this.logger = winston.createLogger({
      level: options.level,
      format: options.format || winston.format.json(),
      transports: options.transports || [new winston.transports.Console()],
    });
  }

  setContext(context: string) {
    this.context = context;
  }

  info(context: string, message?: any) {
    this.logger.info(message, { context: `${this.context}.${context}` });
  }

  debug(context: string, message?: any) {
    this.logger.debug(message, { context: `${this.context}.${context}` });
  }

  warn(context: string, message?: any) {
    this.logger.warn(message, { context: `${this.context}.${context}` });
  }

  error(context: string, message?: any) {
    this.logger.error(message, { context: `${this.context}.${context}` });
  }
}
