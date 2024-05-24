import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AaaMiddleware } from './aaa.middleware';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
// 实现NestModule接口
export class AppModule implements NestModule {
  // configure方法
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(AaaMiddleware).forRoutes('*');
    consumer
      .apply(AaaMiddleware)
      .forRoutes({ path: 'hello*', method: RequestMethod.GET });

    consumer
      .apply(AaaMiddleware)
      .forRoutes({ path: 'world', method: RequestMethod.GET });
  }
}
