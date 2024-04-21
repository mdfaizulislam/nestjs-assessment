import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EmployeesModule } from './employees/employee.module';
import { HierarchyModule } from './hierarchy/hierarchy.module';
import { DatabaseModule } from './database.providers';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EmployeesModule,
    HierarchyModule,
    DatabaseModule,
  ],
})
export class AppModule implements NestModule {
  public static port: number;
  constructor(configService: ConfigService) {
    AppModule.port = configService.get<number>('PORT') || 3000;
  }
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(JWTAuthMiddleware).forRoutes("*");
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
