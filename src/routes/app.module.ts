import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { Userontroller } from './user/user.controller';
import { UserService } from './user/user.service';
import { ResetPasswordMiddleware } from './middleware'

@Module({
  imports: [],
  controllers: [Userontroller],
  providers: [UserService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
  consumer
    .apply(ResetPasswordMiddleware)
    .forRoutes({path: 'user/resetPassword', method: RequestMethod.PUT});
}
}
