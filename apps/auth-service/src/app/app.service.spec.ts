import { Test } from '@nestjs/testing';
import { AppService, Role } from './app.service';
import { DatabaseService } from '../database/database.provider';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt'

describe('AppService', () => {
  let service: AppService;
  const database = {
    user: {
      create: jest.fn(),
      findFirst: jest.fn()
    }
  }
  const jwtService = {
    signAsync: jest.fn()
  }


  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService,
        {
          provide: DatabaseService, useValue: database
        }, {
          provide: JwtService, useValue: jwtService
        }],
    }).compile();

    service = app.get<AppService>(AppService);
    jest.clearAllMocks()
  });

  describe('authentication', () => {
    it('signup should return jwt token', async () => {
      const createUser = {
        id: 42,
        displayName: 'john',
        email: 'test@user.com',
        role: Role.ADMIN,
      }
      const fakeToken = { access_token: "signed-jwt-access-token" }
      database.user.create.mockResolvedValue(createUser)
      jwtService.signAsync.mockResolvedValue(fakeToken.access_token)

      const input = { email: "test@user.com", displayName: "john", password: "123456", role: Role.ADMIN, }
      const actual = await service.signup(input)
      expect(actual).toEqual(fakeToken);

      expect(database.user.create).toHaveBeenCalled()
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: createUser.id.toString(),
        email: createUser.email,
        displayName: createUser.displayName,
        role: createUser.role
      })
    });
    it('login should return jwt token', async () => {
      const createUser = {
        id: 42,
        displayName: 'john',
        email: 'test@user.com',
        password: "hashed-pass",
        role: Role.ADMIN,
      }
      const fakeToken = { access_token: "signed-jwt-access-token" }
      database.user.findFirst.mockResolvedValue(createUser)
      jwtService.signAsync.mockResolvedValue(fakeToken.access_token)

      jest.spyOn(bcrypt, "compare").mockResolvedValue(true)

      const input = { email: "test@user.com", password: "123456" }
      const actual = await service.login(input)
      expect(actual).toEqual(fakeToken);

      expect(database.user.findFirst).toHaveBeenCalledWith({
        where: { email: input.email }
      })
      expect(bcrypt.compare).toHaveBeenCalledWith(
        input.password,
        createUser.password
      )
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: createUser.id.toString(),
        email: createUser.email,
        displayName: createUser.displayName,
        role: createUser.role
      })
    });
  });
});
