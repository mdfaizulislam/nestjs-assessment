import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { HierarchyModule } from './hierarchy/hierarchy.module';
import { DatabaseModule } from './database.providers';
import { LoggerMiddleware } from './logger/logger.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { OrgModule } from './org/org.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EmployeeModule,
    HierarchyModule,
    DatabaseModule,
    AuthModule,
    OrgModule,
  ],
})
export class AppModule implements NestModule {
  public static port: number;
  constructor(configService: ConfigService) {
    AppModule.port = configService.get<number>('PORT') || 3000;
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
