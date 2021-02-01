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
    const { level, format, transports, ...opts } = this.options;

    this.logger = winston.createLogger({
      level: level || 'info',
      format: format || winston.format.json(),
      transports: transports || [new winston.transports.Console()],
      ...opts,
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
