import { INestApplication, Injectable, Module } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { WINSTON_LOGGER_MODULE_OPTIONS } from './winston-logger.constants';
import { WinstonLoggerModule } from './winston-logger.module';
import { WinstonLoggerService } from './winston-logger.service';

@Injectable()
class ApiService {
  constructor(private logger: WinstonLoggerService) {}
}

@Module({
  providers: [ApiService],
  exports: [ApiService],
})
class ApiModule {}

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

describe('import module', () => {
  let app: INestApplication;
  let service: WinstonLoggerService;
  let api: ApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        WinstonLoggerModule.forRoot({ level: 'info', isGlobal: true }),
        ApiModule,
      ],
    }).compile();

    app = module.createNestApplication();
    service = await module.resolve<WinstonLoggerService>(WinstonLoggerService);
    api = module.get<ApiService>(ApiService);
  });

  it('app should be defined', () => {
    expect(app).toBeDefined();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('sub service should be defined', () => {
    expect(api).toBeDefined();
  });
});

describe('import module async', () => {
  let app: INestApplication;
  let service: WinstonLoggerService;
  let api: ApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        WinstonLoggerModule.forRootAsync({
          isGlobal: true,
          useFactory: () => ({ level: 'info' }),
        }),
        ApiModule,
      ],
    }).compile();

    app = module.createNestApplication();
    service = await module.resolve<WinstonLoggerService>(WinstonLoggerService);
    api = module.get<ApiService>(ApiService);
  });

  it('app should be defined', () => {
    expect(app).toBeDefined();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('sub service should be defined', () => {
    expect(api).toBeDefined();
  });
});
