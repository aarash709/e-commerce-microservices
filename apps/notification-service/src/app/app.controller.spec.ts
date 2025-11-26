import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{
        provide: AppService, useValue: {}
      }],
    }).compile();
  });
  describe("empty test", () => {
    it("should success the empty test", () => {
      expect("test").toEqual("test")
    })
  })
});
