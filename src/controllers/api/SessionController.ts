import { sendError } from '@libs/response';
import { Request, Response } from 'express';
import User from '@models/employees';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import settings from '@configs/settings';

class SessionController {
  public async login (req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email: email } });
      if (!user || !await bcrypt.compare(password, user.password)) return sendError(res, 404, 'not found');
      const payload = { id: user.id };
      const token = jwt.sign(payload, settings.jwtSecret, { expiresIn: settings.jwtExpiresIn });
      res.json({ message: 'ok', jwt: token });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }
}
export default new SessionController();
