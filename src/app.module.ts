import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EmployeesModule } from './employees/employee.module';
import { HierarchyModule } from './hierarchy/hierarchy.module';
import { DatabaseModule } from './database.providers';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [EmployeesModule, HierarchyModule, DatabaseModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(JWTAuthMiddleware).forRoutes("*");
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
