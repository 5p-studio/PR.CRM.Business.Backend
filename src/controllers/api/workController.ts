import { sendError, sendSuccess } from '@libs/response';
import { Request, Response } from 'express';
import Work from '@models/work';
// import { Op } from 'sequelize';

class WorkController {
  public async createWork (req: Request, res: Response) {
    try {
      const params = req.parameters.permit(Work.CREATABLE_PARAMETERS).value();
      const work = await Work.create(params);
      sendSuccess(res, { message: 'create successful', work });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async editWork (req: Request, res: Response) {
    try {
      const work = await Work.findOne({ where: { id: req.params.id, isLocked: false } });
      if (!work) {
        return sendError(res, 404, 'Not Found');
      }
      const params = req.parameters.permit(Work.UPDATEABLE_PARAMETERS).value();
      await work.update(params);

      sendSuccess(res, { message: 'edit successful', work });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async deleteWork (req: Request, res: Response) {
    try {
      const workId = req.params.id;
      const work = await Work.findOne({ where: { id: workId } });
      if (!work) {
        return sendError(res, 404, 'Not Found');
      }
      await work.destroy();
      sendSuccess(res, { message: 'delete successful' });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async lockWork (req: Request, res: Response) {
    try {
      const work = await Work.findOne({ where: { id: req.params.id, isLocked: false } });
      if (!work) {
        return sendError(res, 404, 'Not Found');
      }
      work.isLocked = true;
      await work.save();

      sendSuccess(res, { message: 'lock successful' });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async unLockWork (req: Request, res: Response) {
    try {
      const work = await Work.findOne({ where: { id: req.params.id, isLocked: true } });

      if (!work) {
        return sendError(res, 404, 'Not Found');
      }
      work.isLocked = false;
      await work.save();

      sendSuccess(res, { message: 'unlock successful' });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }

  public async getAllWorkInProcess (req:Request, res: Response) {
    try {
      const idprocess = req.params.processId;
      const works = await Work.findAll({ where: { idProcess: idprocess } });
      sendSuccess(res, { works });
    } catch (error) {
      sendError(res, 500, error.message, error);
    }
  }
}

export default new WorkController();
