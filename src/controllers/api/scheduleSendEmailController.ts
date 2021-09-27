import { sendError, sendSuccess } from '@libs/response';
import { Request, Response } from 'express';
import SendEmailWorker from '../../workers/sendEmail';
class Schedule {
  public async scheduleSendEmail (req: Request, res: Response) {
    try {
      const { idcustomer, subject, htmlContent } = req.body;
      const delay = parseInt(req.params.time);
      const sendemailworker = new SendEmailWorker(delay, idcustomer, subject, htmlContent);

      sendemailworker.shedulejob();

      if (req.params.time === '0') {
        sendSuccess(res, { message: 'gui email thanh cong' });
      } else {
        sendSuccess(res, { message: 'dat lich thanh cong' });
      }
    } catch (err) {
      sendError(res, 500, err.message, err);
    }
  }
}

export default new Schedule();
