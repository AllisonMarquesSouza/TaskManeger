import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthResponseDto } from './auth.dto';
import { compareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    private jwtExpirationTimeInSeconds: number;

    constructor(
        private readonly userService: UsersService
        , private readonly jwtService: JwtService
        , private readonly configService: ConfigService
    ) {
        this.jwtExpirationTimeInSeconds = this.configService.get<number>('JWT_EXPIRATION_TIME')
    }

    async singIn(username: string, password: string): Promise<AuthResponseDto> {
        const foundUser = await this.userService.findByUsername(username);

        if (!foundUser || !compareSync(password, foundUser.password_hash)) {
            throw new UnauthorizedException(`Password incorrect, check it`);
        }

        const payload = { sub: foundUser.id, username: foundUser.username };

        const token = this.jwtService.sign(payload);

        return { token, expiresIn: this.jwtExpirationTimeInSeconds };
    }

}
