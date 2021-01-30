import { DynamicModule, Module } from '@nestjs/common';
import {
  WinstonLoggerModuleAsyncOptions,
  WinstonLoggerModuleOptions,
} from './interfaces';
import { WINSTON_LOGGER_MODULE_OPTIONS } from './winston-logger.constants';
import { WinstonLoggerService } from './winston-logger.service';

@Module({})
export class WinstonLoggerModule {
  static forRoot(options: WinstonLoggerModuleOptions): DynamicModule {
    return {
      module: WinstonLoggerModule,
      providers: [
        { provide: WINSTON_LOGGER_MODULE_OPTIONS, useExisting: options },
        WinstonLoggerService,
      ],
      exports: [WinstonLoggerService],
    };
  }

  static forRootAsync(options: WinstonLoggerModuleAsyncOptions): DynamicModule {
    return {
      module: WinstonLoggerModule,
      imports: options.imports || [],
      providers: [
        {
          provide: WINSTON_LOGGER_MODULE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        WinstonLoggerService,
      ],
      exports: [WinstonLoggerService],
    };
  }
}
