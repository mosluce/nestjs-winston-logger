import { ModuleMetadata } from '@nestjs/common';
import { Logform, transport } from 'winston';

export interface WinstonLoggerModuleOptions {
  level: 'silly' | 'debug' | 'verbose' | 'info' | 'warn' | 'error';
  format?: Logform.Format;
  transports?: transport | transport[];
  isGlobal?: boolean;
}

export interface WinstonLoggerModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  isGlobal?: boolean;
  useFactory?: (
    ...args: any[]
  ) => Promise<WinstonLoggerModuleOptions> | WinstonLoggerModuleOptions;
  inject?: any[];
}
