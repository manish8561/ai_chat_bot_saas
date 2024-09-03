import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Model } from 'mongoose';
import { User } from './schemas/user.schemas';
import { getModelToken } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';

import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/common/role/role.enum';
import { UserStatus } from 'src/common/enums';


describe('UsersService', () => {
  let service: UsersService;

  let model: Model<User>;

  const mockUser = {
    _id: 'mockId',
    name: 'Mock Name',
    email: 'mock@example.com',
    password: 'mockPassword',
    role: Role.User,
    status: UserStatus.Active,
  };

  const mockUserModel: any = jest.fn().mockImplementation(() => ({
    save: jest.fn().mockResolvedValue(mockUser),
  }));

  mockUserModel.find = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue([mockUser]),
  });

  mockUserModel.findOne = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockUser),
  });

  mockUserModel.updateOne = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue({ modifiedCount: 1 }),
  });

  mockUserModel.deleteOne = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue({ deletedCount: 1 }),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should hash the password and create a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Mock Name',
        email: 'mock@example.com',
        password: 'mockPassword',
      };

      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');
      const newUser = { ...createUserDto, _id: 'mockId', role: Role.User, status: UserStatus.Active };


      const result = await service.create(createUserDto);

      expect(bcrypt.hash).toHaveBeenCalledWith('mockPassword', 10);
      expect(result).toEqual(newUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockUser]);
    });
  });

  describe('findById', () => {
    it('should return a user by ID', async () => {
      const result = await service.findById('mockId');
      expect(result).toEqual(mockUser);
    });
  });

  describe('findOne', () => {
    it('should return a user by email', async () => {
      const result = await service.findOne('mock@example.com');
      expect(result).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('should update a user by ID', async () => {
      const updateUserDto: UpdateUserDto = { name: 'Updated Name' };

      const result = await service.update('mockId', updateUserDto);
      expect(result).toEqual({ modifiedCount: 1 });
    });
  });

  describe('remove', () => {
    it('should remove a user by ID', async () => {
      const result = await service.remove('mockId');
      expect(result).toEqual({ deletedCount: 1 });
    });
  });
});