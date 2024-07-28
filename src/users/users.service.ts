import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';
import { createUserFromDto, UserDto } from './user.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async create(newUser: UserDto): Promise<User> {
        const userAlreadyRegister = await this.userRepository.findOne({
            where: { username: newUser.username }
        })

        if (userAlreadyRegister) {
            throw new ConflictException(`User with ${newUser.username} already registered`);
        }
        const converToUser = createUserFromDto(newUser);
        const saveUser = await this.userRepository.save(converToUser);
        return saveUser;
    }

    async findByUsername(username: string): Promise<User> {
        const foundUser = await this.userRepository.findOne({
            where: { username: username }
        })

        if (!foundUser) {
            throw new HttpException(`User with ${username} not found`, HttpStatus.NOT_FOUND);
        }
        return foundUser;

    }

}


