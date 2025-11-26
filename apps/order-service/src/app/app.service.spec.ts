import { Test } from '@nestjs/testing';
import { AppService } from './app.service';
import { DatabaseService } from '../database/database.service';
import { OrderStatus } from '@orderly-platform/common';

describe('AppService', () => {
  let service: AppService;
  const mock = {
    order: {
      create: jest.fn()
    }
  }

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService, { provide: DatabaseService, useValue: mock }],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('order service', () => {
    it("be defined", () => {
      expect(service).toBeDefined()
    })
    it("should create an order", async () => {
      const input = { total: 10, status: OrderStatus.PENDING, orders: [{ productId: "123456", quantity: 10, price: 10 }] }
      const mockResponse = { total: 10 }
      mock.order.create.mockResolvedValue(mockResponse)

      const result = await service.create(input)
      console.log("test result: ", result)
      expect(result).toEqual(mockResponse)
      // expect(mock.order.create).toHaveBeenCalledWith({ data: { total: input.total, status: input.status, orders: { create: input.orders }, include: { orders: true } } })
    })
  });
});
