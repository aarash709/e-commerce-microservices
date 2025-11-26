import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';
import { CreateProductDto, PRODUCT_PATTERNS } from '@orderly-platform/common';

describe('AppController', () => {
  let appController: AppController;
  let appService: jest.Mocked<AppService>
  let kafkaClient: jest.Mocked<ClientKafka>

  beforeEach(async () => {
    const serviceMock = {
      handleProcessProducts: jest.fn(),
      createProduct: jest.fn(),
      updateProduct: jest.fn(),
    }
    const kafkaMock = {
      emit: jest.fn()
    }
    const module = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        { provide: AppService, useValue:  serviceMock  },
        { provide: "NOTIFICAION_SERVICE", useValue:  kafkaMock  }],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get(AppService)
    kafkaClient = module.get("NOTIFICAION_SERVICE")

    jest.clearAllMocks()
  });

  describe('product service', () => {
    it('should create a product an emit PRODUCT_CREATED', async () => {
      const dto: CreateProductDto = { name: "milk", price: "2", sku: "sku-10", stock: 10, category: "default", active: true }

      appController.create(dto)

      expect(appService.createProduct).toHaveBeenCalledWith(dto)
      //notification
      expect(kafkaClient.emit).toHaveBeenCalledWith(
        PRODUCT_PATTERNS.PRODUCT_CREATED,
        dto
      )
    });
  });
});
