import { Module } from '@nestjs/common';
import { WinstonLoggerModule } from './winston-logger/winston-logger.module';

@Module({
  imports: [WinstonLoggerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
