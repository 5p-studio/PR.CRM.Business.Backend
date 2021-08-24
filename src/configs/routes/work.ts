import { Router } from 'express';
import WorkController from '@controllers/api/workController';

const router = Router();

router.post('/', WorkController.createWork);
router.put('/:id', WorkController.editWork);
router.delete('/:id', WorkController.deleteWork);
router.patch('/:id/lock', WorkController.lockWork);
router.patch('/:id/unlock', WorkController.unLockWork);
router.get('/inprocess/:processId', WorkController.getAllWorkInProcess);
export default router;
