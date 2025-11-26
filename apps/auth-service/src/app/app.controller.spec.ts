import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService, Role } from './app.service';

describe('AppController', () => {
  let controller: AppController;
  const service = {
    signup: jest.fn(),
    login: jest.fn()
  }
  beforeEach(async () => {
    const app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: AppService, useValue: service }],
    }).compile();

    controller = app.get<AppController>(AppController);
    jest.clearAllMocks()
  });

  describe('auth controller', () => {
    it('should return access token', async () => {
      const input = {
        email: "test@user.com",
        displayName: "john",
        password: "123456",
        role: Role.ADMIN
      }
      const fakeToken = { access_token: "signed-jwt-access-token" }
      service.signup.mockReturnValue(fakeToken)
      const actual = await controller.signup(input)
      expect(actual).toEqual(fakeToken);
      expect(service.signup).toHaveBeenCalledWith(input)
    });
  });
});
