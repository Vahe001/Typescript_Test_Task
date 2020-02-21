import { Controller, Post, Req, Put, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { RequestCustom } from './interface'
@Controller('user')
export class Userontroller {
  constructor(private readonly appService: UserService) {}
  @Post('signUp')
  async registration(@Req() request: Request, @Res() res: Response): Promise<object> {
    try {
      const { username, email, password } = request.body;
      const createdUser = await this.appService.createUser(username, email, password);
      const token = sign({ id: createdUser.id, username: createdUser.username }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
      return res.send ({
        user: createdUser,
        token
      })
    } catch (e) {
      console.log(e);
      return res.send('internal server error')
    }

  }

  @Post('login')
  async login(@Req() request: Request, @Res() res: Response): Promise<object> {
    try {
      const { email, password } = request.body;
      const gotUser = await this.appService.login(email, password)
      const token = sign({ id: gotUser.id, username: gotUser.username }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

      return res.send({
        user: gotUser,
        token
      })
    } catch (e) {
      if(e.error)
        return res.send(e);
      return res.send('internal server error')
    }

  }

  @Post('forgotPassword')
  async forgotPassword(@Req() request: Request, @Res() res: Response): Promise<object> {
    try {
      const { email } = request.body;
      const responce = await this.appService.sendForgotMail(email);
      return res.send(responce)
    } catch (e) {
      return res.send('internal server error')

    }

  }

  @Put('resetPassword')
  async resetPassword(@Req() request: RequestCustom, @Res() res: Response): Promise<object> {
    try {
      const { newPassword } = request.body;
      if(!newPassword)
        return {error: true, message: 'Please send newPassword'}
      const responce = await this.appService.updatePassword(request.decoded.id, newPassword)
      return res.send(responce)
    } catch (e) {
      return res.send('internal server error')
    }

  }
}