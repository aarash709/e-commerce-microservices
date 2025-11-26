import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ORDER_PATTERN, OrderStatus } from '@orderly-platform/common';
import { DatabaseService } from '../database/database.service';

describe('AppController', () => {
  let appController: AppController;
  const kafkaClient = {
    emit: jest.fn(),
  };
  const database = {
    order: {
      create: jest.fn()
    }
  }

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        { provide: DatabaseService, useValue: database },
        {
          provide: "KAFKA_SERVICE",
          useValue: kafkaClient
        }],
    }).compile();
    appController = moduleRef.get<AppController>(AppController);
  });

  describe('orders', () => {
    it('should create an order', async () => {
      const input = { total: 10, status: OrderStatus.PENDING, orders: [{ productId: "123456", quantity: 10, price: 10 }] }
      const actual = await appController.createOrder(input)
      expect(actual).toEqual(undefined);
      expect(kafkaClient.emit).toHaveBeenCalledWith(ORDER_PATTERN.ORDER_CREATED, input)
    });
  });
});
