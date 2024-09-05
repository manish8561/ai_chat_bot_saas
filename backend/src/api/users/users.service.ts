import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcrypt';
import { Role } from 'src/common/role/role.enum';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await hash(createUserDto.password, 10);

    const record = new this.userModel(createUserDto);
    return record.save();
  }

  findAll(): Promise<User[]> {
    return this.userModel.find({ role: Role.User }).exec();
  }

  async findById(_id: string): Promise<User | undefined> {
    return this.userModel
      .findOne({ _id }, { name: 1, email: 1, role: 1, status: 1, _id: 0 })
      .exec();
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  update(_id: string, updateUserDto: UpdateUserDto): Promise<any> {
    return this.userModel.updateOne({ _id }, updateUserDto).exec();
  }

  async remove(_id: string) {
    return this.userModel.deleteOne({ _id }).exec();
  }
}
