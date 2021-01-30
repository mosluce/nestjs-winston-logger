import { ModuleMetadata } from '@nestjs/common';
import { Logform, transport } from 'winston';

export interface WinstonLoggerModuleOptions {
  level: string;
  format?: Logform.Format;
  transports?: transport | transport[];
}

export interface WinstonLoggerModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (
    ...args: any[]
  ) => Promise<WinstonLoggerModuleOptions> | WinstonLoggerModuleOptions;
  inject?: any[];
}
