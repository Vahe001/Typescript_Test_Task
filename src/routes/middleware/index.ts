import { Injectable, NestMiddleware, RequestMethod } from '@nestjs/common';
import { Request, Response } from 'express';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { RequestCustom, Decoded } from '../user/interface'

@Injectable()
export class ResetPasswordMiddleware implements NestMiddleware {
  async use(req: RequestCustom, res: Response, next: Function) {
    try{
      console.log('in middlewre')
      const { resettoken } = req.headers;
      const decoded = await verify(`${resettoken}`, process.env.JWT_SECRET_KEY);

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      req.decoded = decoded;
      next();

    } catch (e) {
      console.log(e)
      return res.status(500).send('internal server error')
    }
  }
}

export class Middleware implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ResetPasswordMiddleware)
      .forRoutes({path: 'user/resetPassword', method: RequestMethod.POST});
  }
}
