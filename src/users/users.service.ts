import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return this.prismaService.user.findMany();
  }

  async findOne(id: string) {
    return this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id: id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    return this.prismaService.user.delete({
      where: {
        id: id,
      },
    });
  }

  async determineLoanOptions(userId: string) {
    const user = this.findOne(userId);
    if (!user) {
      throw new NotFoundException();
    }
    const loans = [];
    const income = (await user).income;
    const age = (await user).age;
    const location = (await user).location;

    if (income <= 3000) {
      loans.push({ type: 'PERSONAL', interest_rate: '4' });
    }

    if (income > 3000 && income < 5000 && age < 30 && location === 'SP') {
      loans.push({ type: 'PERSONAL', interest_rate: '4' });
    }

    if (income >= 5000) {
      loans.push({ type: 'CONSIGMENT', interest_rate: '2' });
    }
    if (income <= 3000) {
      loans.push({ type: 'GUARANTEED', interest_rate: '3' });
    }
    if (
      income <= 3000 ||
      (3000 < income && income <= 5000 && age < 30 && location === 'SP')
    ) {
      loans.push({ type: 'GUARANTEED', interest_rate: '3' });
    }

    return { customer: (await user).name, loans: loans };
  }
}
