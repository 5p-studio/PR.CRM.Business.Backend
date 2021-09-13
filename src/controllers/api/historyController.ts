import { sendError, sendSuccess } from '@libs/response';
import { Request, Response } from 'express';
import History from '@models/history';

class HistoryController {
  public async getAllHistory (req: Request, res: Response) {
    try {
      const page = req.params.page as string || '1';
      const limit = req.params.size as string || '25';
      const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);

      const history = await History.findAndCountAll({
        limit: parseInt(limit, 10),
        offset: offset,
      });
      sendSuccess(res, { content: history.rows, totalPage: Math.ceil(history.count / parseInt(limit, 10)) });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }
}

export default new HistoryController();
