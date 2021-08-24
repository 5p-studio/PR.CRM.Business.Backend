import { sendError, sendSuccess } from '@libs/response';
import { Request, Response } from 'express';
import Process from '@models/process';

class ProcessController {
  public async createProcess (req: Request, res: Response) {
    try {
      const params = req.parameters.permit(Process.CREATABLE_PARAMETERS).value();
      const process = await Process.create(params);
      sendSuccess(res, { message: 'create successful', process });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async editProcess (req: Request, res: Response) {
    try {
      const process = await Process.findOne({ where: { id: req.params.id, isLocked: false } });

      if (!process) {
        return sendError(res, 404, 'Not Found');
      }

      const params = req.parameters.permit(Process.UPDATEABLE_PARAMETERS).value();
      await process.update(params);

      sendSuccess(res, { message: 'edit successful', process });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async lockProcess (req: Request, res: Response) {
    try {
      const process = await Process.findOne({ where: { id: req.params.id, isLocked: false } });

      if (!process) {
        return sendError(res, 404, 'Not Found');
      }

      process.isLocked = true;
      await process.save();

      sendSuccess(res, { message: 'lock successful' });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async unLockProcess (req: Request, res: Response) {
    try {
      const process = await Process.findOne({ where: { id: req.params.id, isLocked: true } });

      if (!process) {
        return sendError(res, 404, 'Not Found');
      }
      process.isLocked = false;
      await process.save();

      sendSuccess(res, { message: 'unlock successful' });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async deleteProcess (req: Request, res: Response) {
    try {
      const processId = req.params.id;
      const process = await Process.findOne({ where: { id: processId } });
      if (!process) {
        return sendError(res, 404, 'Not Found');
      }
      await process.destroy();
      sendSuccess(res, { message: 'delete successful' });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }
}

export default new ProcessController();
