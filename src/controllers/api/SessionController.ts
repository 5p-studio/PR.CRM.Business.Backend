import { sendError } from '@libs/response';
import { Request, Response } from 'express';
import User from '@models/employees';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class SesstionController {
  public async login (req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email: email } });
      const a = await bcrypt.compare(password, user.password);
      if (user == null || !a) return sendError(res, 404, 'not found');
      const payload = { id: user.id };
      const token = jwt.sign(payload, 'khoabimat');
      res.json({ message: 'ok', jwt: token });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }
}
export default new SesstionController();
