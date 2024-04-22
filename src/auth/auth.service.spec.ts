import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({
        secret: 'abcd123',
        signOptions: { expiresIn: '1h' },
      })],
      providers: [AuthService, LocalStrategy, JwtStrategy ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be validate user', () => {
    expect(service.validateUser({username: 'userA',
    password: 'abc123abc'})).toBeTruthy();
  });

  it('should be not validate user', () => {
    expect(service.validateUser({username: 'userA',
    password: 'sadfdasfa'})).toBeFalsy();
  });
});
