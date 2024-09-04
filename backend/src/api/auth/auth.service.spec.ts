import { Test, TestingModule } from '@nestjs/testing';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { Role } from 'src/common/role/role.enum';
import { UserStatus } from 'src/common/enums';
import { AuthResponse } from 'src/common/types';
import { LoginDto } from './dto/login.dto';
import { HttpException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';

jest.mock('bcrypt', () => ({
    compare: jest.fn(),
}));

describe('AuthService', () => {
    let service: AuthService;
    let usersService: UsersService;
    let jwtService: JwtService;
    let configService: ConfigService;


    const mockUser = {
        _id: 'mockId',
        email: 'mock@example.com',
        password: 'hashedPassword',
        name: 'Mock Name',
        role: Role.User,
        status: UserStatus.Active,
    };

    const mockUsersService = {
        findOne: jest.fn().mockResolvedValue(undefined),
        findById: jest.fn().mockResolvedValue(undefined),
        create: jest.fn().mockResolvedValue(undefined),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: mockUsersService,
                },
                {
                    provide: JwtService,
                    useValue: {
                        signAsync: jest.fn(),
                        verify: jest.fn(),
                    },
                },
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn().mockReturnValue('test-secret'),
                    },
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        jwtService = module.get<JwtService>(JwtService);
        usersService = module.get<UsersService>(UsersService);
        configService = module.get<ConfigService>(ConfigService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('login', () => {
        it('should throw an HttpException with 401 if user is not found', async () => {
            jest.spyOn(usersService, 'findOne').mockResolvedValue(null);

            const loginDto: LoginDto = { email: 'notfound@example.com', password: 'password' };

            await expect(service.login(loginDto)).rejects.toThrow(HttpException);
            await expect(service.login(loginDto)).rejects.toThrowError('USER_NOT_REGISTERED');
            await expect(service.login(loginDto)).rejects.toHaveProperty('status', 401);
        });

        it('should throw an HttpException with 403 if password is incorrect', async () => {
            jest.spyOn(usersService, 'findOne').mockResolvedValue(mockUser);
            (compare as jest.Mock).mockResolvedValue(false);

            const loginDto: LoginDto = { email: 'mock@example.com', password: 'wrongpassword' };

            await expect(service.login(loginDto)).rejects.toThrow(HttpException);
            await expect(service.login(loginDto)).rejects.toThrowError('INVALID_CREDENTAILS');
            await expect(service.login(loginDto)).rejects.toHaveProperty('status', 403);
        });

        it('should return an AuthResponse if credentials are correct', async () => {
            const token = 'mockAccessToken';
            jest.spyOn(usersService, 'findOne').mockResolvedValue(mockUser);
            (compare as jest.Mock).mockResolvedValue(true);

            jest.spyOn(jwtService, 'signAsync').mockResolvedValue(token);

            const loginDto: LoginDto = { email: 'mock@example.com', password: 'password' };

            const result: AuthResponse = await service.login(loginDto);

            expect(result).toEqual({
                accessToken: token,
                name: mockUser.name,
            });
            expect(usersService.findOne).toHaveBeenCalledWith(loginDto.email);
            expect(compare).toHaveBeenCalledWith(loginDto.password, mockUser.password);
            expect(jwtService.signAsync).toHaveBeenCalledWith({ sub: mockUser._id, role: mockUser.role });
        });
    });

    describe('register', () => {
        it('should throw an HttpException with 401 if user already exists', async () => {
            jest.spyOn(usersService, 'findOne').mockResolvedValue(mockUser);

            const registerDto: RegisterDto = { email: 'mock@example.com', password: 'password', name: 'Mock Name' };

            await expect(service.register(registerDto)).rejects.toThrow(HttpException);
            await expect(service.register(registerDto)).rejects.toThrowError('USER_ALREADY_EXISTS');
            await expect(service.register(registerDto)).rejects.toHaveProperty('status', 401);
        });

        it('should create a new user and return an AuthResponse if user does not exist', async () => {
            const token = 'mockAccessToken';
            jest.spyOn(usersService, 'findOne').mockResolvedValue(null);
            jest.spyOn(usersService, 'create').mockResolvedValue(mockUser);
            jest.spyOn(jwtService, 'signAsync').mockResolvedValue(token);

            const registerDto: RegisterDto = { email: 'new@example.com', password: 'password', name: 'New User' };

            const result: AuthResponse = await service.register(registerDto);

            expect(result).toEqual({
                accessToken: token,
                name: mockUser.name,
            });
            expect(usersService.findOne).toHaveBeenCalledWith(registerDto.email);
            expect(usersService.create).toHaveBeenCalledWith(registerDto);
            expect(jwtService.signAsync).toHaveBeenCalledWith({ sub: mockUser._id, role: mockUser.role });
        });
    });

    describe('verifyUser', () => {
        it('should throw an HttpException with 401 if user is not found', async () => {
            jest.spyOn(usersService, 'findById').mockResolvedValue(null);

            const userId = 'nonexistentId';

            await expect(service.verifyUser(userId)).rejects.toThrow(HttpException);
            await expect(service.verifyUser(userId)).rejects.toThrowError('USER_NOT_FOUND');
            await expect(service.verifyUser(userId)).rejects.toHaveProperty('status', 401);
        });

        it('should return the user if found', async () => {
            jest.spyOn(usersService, 'findById').mockResolvedValue(mockUser);

            const userId = 'mockId';

            const result = await service.verifyUser(userId);

            expect(result).toEqual(mockUser);
            expect(usersService.findById).toHaveBeenCalledWith(userId);
        });
    });
});
