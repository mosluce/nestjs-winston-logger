import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { WINSTON_LOGGER_MODULE_OPTIONS } from './winston-logger.constants';
import { WinstonLoggerService } from './winston-logger.service';

describe('WinstonLoggerService', () => {
  let service: WinstonLoggerService;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: WINSTON_LOGGER_MODULE_OPTIONS,
          useValue: {
            level: 'debug',
          },
        },
        WinstonLoggerService,
      ],
    }).compile();

    app = module.createNestApplication();
    service = await module.resolve<WinstonLoggerService>(WinstonLoggerService);
  });

  it('app should be defined', () => {
    expect(app).toBeDefined();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });
});
