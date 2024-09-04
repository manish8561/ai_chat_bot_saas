import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Role } from 'src/common/role/role.enum';
import { UserStatus } from 'src/common/enums';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUser = {
    _id: 'mockId',
    name: 'Mock Name',
    email: 'mock@example.com',
    password: 'mockPassword',
    role: Role.User,
    status: UserStatus.Active,
  };

  const mockUsersService = {
    create: jest.fn().mockResolvedValue(mockUser),
    findAll: jest.fn().mockResolvedValue([mockUser]),
    findById: jest.fn().mockResolvedValue(mockUser),
    update: jest.fn().mockResolvedValue({ modifiedCount: 1 }),
    remove: jest.fn().mockResolvedValue({ deletedCount: 1 }),
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{
        provide: UsersService,
        useValue: mockUsersService,
      },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Mock Name',
        email: 'mock@example.com',
        password: 'mockPassword',
      };

      const result = await controller.create(createUserDto);

      expect(service.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockUser]);
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const result = await controller.findOne('mockId');

      expect(service.findById).toHaveBeenCalledWith('mockId');
      expect(result).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('should update a user by ID', async () => {
      const updateUserDto: UpdateUserDto = { name: 'Updated Name' };

      const result = await controller.update('mockId', updateUserDto);

      expect(service.update).toHaveBeenCalledWith('mockId', updateUserDto);
      expect(result).toEqual({ modifiedCount: 1 });
    });
  });

  describe('remove', () => {
    it('should remove a user by ID', async () => {
      const result = await controller.remove('mockId');

      expect(service.remove).toHaveBeenCalledWith('mockId');
      expect(result).toEqual({ deletedCount: 1 });
    });
  });
});
