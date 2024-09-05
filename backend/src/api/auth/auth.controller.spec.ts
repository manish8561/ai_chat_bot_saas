import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { createCookie } from './helpers/createCookie';

jest.mock('./helpers/createCookie');

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
    verifyUser: jest.fn(),
  };

  const mockResponse = {
    cookie: jest.fn(),
  } as unknown as Response;

  const mockUser = {
    _id: 'mockId',
    email: 'mock@example.com',
    name: 'Mock Name',
    role: 'user',
  };

  const mockAuthResponse = {
    accessToken: 'mockAccessToken',
    name: 'Mock Name',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user and set a cookie', async () => {
      const registerDto: RegisterDto = {
        email: 'test@example.com',
        password: 'password',
        name: 'Test User',
      };
      mockAuthService.register.mockResolvedValue(mockAuthResponse);

      const result = await controller.register(registerDto, mockResponse);

      expect(result).toEqual(mockAuthResponse);
      expect(authService.register).toHaveBeenCalledWith(registerDto);
      expect(createCookie).toHaveBeenCalledWith(
        mockAuthResponse.accessToken,
        mockResponse,
      );
    });
  });

  describe('login', () => {
    it('should log in a user and set a cookie', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password',
      };
      mockAuthService.login.mockResolvedValue(mockAuthResponse);

      const result = await controller.login(loginDto, mockResponse);

      expect(result).toEqual(mockAuthResponse);
      expect(authService.login).toHaveBeenCalledWith(loginDto);
      expect(createCookie).toHaveBeenCalledWith(
        mockAuthResponse.accessToken,
        mockResponse,
      );
    });
  });

  describe('authStatus', () => {
    it('should return the user information if verified', async () => {
      mockAuthService.verifyUser.mockResolvedValue(mockUser);

      const req = { user: { sub: 'mockId' } };

      const result = await controller.authStatus(req);

      expect(result).toEqual(mockUser);
      expect(authService.verifyUser).toHaveBeenCalledWith('mockId');
    });
  });
});
