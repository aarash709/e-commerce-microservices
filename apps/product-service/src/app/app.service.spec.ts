import { Test } from '@nestjs/testing';
import { AppService } from './app.service';
import { DatabaseService } from '../database/database.service';

describe('AppService', () => {
  let service: AppService;
  const database = {
    product: {
      create: jest.fn(),
      update: jest.fn(),
    },
    $transaction: jest.fn()
  }
  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService, { provide: DatabaseService, useValue: database }],
    }).compile();

    service = app.get<AppService>(AppService);
    jest.clearAllMocks()
  });

  describe('product service', () => {
    it('should call create product', async () => {
      const input = {
        name: "test name",
        sku: "sku-10",
        description: "description",
        price: "100",
        stock: 10,
        category: "default",
        active: true
      }
      database.product.create.mockResolvedValue(input)
      const actual = await service.createProduct(input)
      expect(actual).toEqual(undefined);
      expect(database.product.create).toHaveBeenCalledWith({ data: input })
    });
  });
});
