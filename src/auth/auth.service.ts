import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

const sampleUsers = [
    {
        id: 1,
        username: 'userA',
        password: 'abc123abc'
    },
    {
        id: 2,
        username: 'userA',
        password: 'xyz123xyz'
    },
]

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    validateUser({username, password}: AuthPayloadDto) {
        const findUser = sampleUsers.find((user) => user.username === username);
        if(!findUser) return null;
        if(password === findUser.password) {
            const {password, ...user} = findUser;
            return this.jwtService.sign(user);
        }
    }
}
