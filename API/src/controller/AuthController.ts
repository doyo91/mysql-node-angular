import { validate } from 'class-validator';
import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '../entity/User';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';

class AuthController {
  static login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!(username && password))
      return res
        .status(400)
        .json({ message: 'Username & Password are required!' });

    const userRepository = getRepository(User);
    let user: User;

    try {
      user = await userRepository.findOneOrFail({ where: { username } });
    } catch (err) {
      return res.status(400).json({
        message: 'Username or password incorrect!',
      });
    }

    // Check password
    if (!user.checkPassword(password)) {
      return res
        .status(400)
        .json({ message: 'Username or Password are incorrect!' });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtSecret,
      { expiresIn: '1h' }
    );

    // All ok
    res.json({
      message: 'OK',
      token,
    });
  };

  static changePassword = async (req: Request, res: Response) => {
    const { userId } = res.locals.jwtPayload;
    const { oldPassword, newPassword } = req.body;

    if (!(oldPassword && newPassword)) {
      res
        .status(400)
        .json({ message: 'Old password & new password are required' });
    }

    const userRepository = getRepository(User);
    let user: User;

    try {
      user = await userRepository.findOneOrFail(userId);
    } catch (err) {
      res.status(400).json({ message: 'Something goes wrong!' });
    }

    if (!user.checkPassword(oldPassword)) {
      return res.status(401).json({ message: 'Check your old password' });
    }

    user.password = newPassword;

    const validationOps = { validationError: { targe: false, value: false } };
    const errors = await validate(user, validationOps);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // Hash password
    user.hashPassword();
    userRepository.save(user);

    res.status(200).json({ message: 'Password changed' });
  };
}

export default AuthController;
