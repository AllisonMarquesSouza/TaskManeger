import { User } from "src/db/entities/user.entity";
import { hashSync as bcryptHashSync } from 'bcrypt';


export class UserDto {
    id: string;
    username: string;
    password: string;
}
export function createUserFromDto(userDto: UserDto): User {
    const user = new User();
    user.username = userDto.username;
    user.password_hash = bcryptHashSync(userDto.password, 10);
    return user;
}