import * as bcrypt from 'bcryptjs';
import User from '../database/models/usersModel';
import { Status } from '../types/status';
import token from '../utils/jwt';

export default class UserServices {
  static async userLogin(email: string, password: string): Promise<Status> {
    const loginUser = await User.findOne({ where: { email } });

    if (!loginUser || !bcrypt.compareSync(password, loginUser.password)) {
      return { status: 401, data: { message: 'Invalid email or password' } };
    }

    const userToken = token.generateToken({ email });
    return { status: 200, data: { token: userToken } };
  }

  static async userRole(email: string): Promise<Status> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return { status: 403, data: {} };
    }
    return { status: 200, data: { role: user.role } };
  }
}
