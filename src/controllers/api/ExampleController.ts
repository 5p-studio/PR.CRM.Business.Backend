import { sendError, sendSuccess } from '@libs/response';
import { Request, Response } from 'express';
import User from '@database/model/employees';
class ExampleController {
  public async index (req: Request, res: Response) {
    try {
      // business logic here
      sendSuccess(res, { message: 'Hello world' });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }
}

export default new ExampleController();
