import { Request, Response } from 'express';
import UserServices from '../services/usersService';

export default class UserController {
  static async userLogin(request: Request, response: Response): Promise<Response> {
    const { status, data } = await UserServices
      .userLogin(request.body.email, request.body.password);
    return response.status(status).json(data);
  }
}
