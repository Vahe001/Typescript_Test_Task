import { sign } from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';
import {Users} from '../../../models';
import { Injectable } from '@nestjs/common';
import emailInitializer from './helper';
import config from './../../config'

interface UserInterface {
  id?: number,
  username? :string,
  email?: string,
  createdAt?: string,
  updatedAt?: string
}
const transporter =  emailInitializer();

@Injectable()
export class UserService {
  async createUser(username: string, email: string, password: string): Promise<UserInterface> {
    try{
      if(!config.PASSWORD_REG_EXP.test(password))
        throw {error: true, message: 'The password is not valid.'};
      if(!config.EMAIL_REG_EXP.test(email))
        throw {error: true, message: 'The email is not valid.'};

      const hashPassword = await hash(password, 10);
      return Users.create({ username, email, password: hashPassword });
    } catch (e) {
      throw e
    }

  }
  async login(email: string, password: string): Promise<UserInterface> {
    try{
      const user = await Users.findOne({ where: { email }});
      const isRightPassword = await compare(password, user.password);

      if(!isRightPassword)
        throw { error: true, code: 400, message: 'Incorrect email/password'};

      return {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    } catch (e) {
      console.log(e)
      throw e
    }

  }
  async sendForgotMail( email: string ): Promise<object> {
    try{
      const user = await Users.findOne({ where: { email }});

      const token = sign({ id: user.id }, process.env.JWT_RESET_SECRET_KEY, { expiresIn: '1h' });

      transporter.sendMail({
        to: user.email,
        subject: "Hello ✔",
        text: "Please make a reset password query with this token.",
        html: `<b><i>${token}</i></b>`
      });
      return { success: true}
    } catch (e) {
      throw e
    }

  }
  async updatePassword( id: number, newPassword: string ): Promise<object> {
    try{
      if(!config.PASSWORD_REG_EXP.test(newPassword))
        throw {error: true, message: 'The password is not valid.'};
      const hashPassword = await hash(newPassword, 10);
      return Users.update({ password: hashPassword }, {where: {id}, fields: ['password'], returning: true});
    } catch (e) {
      throw e
    }

  }
}