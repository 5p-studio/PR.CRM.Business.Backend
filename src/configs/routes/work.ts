import { Router } from 'express';
import WorkController from '@controllers/api/workController';

const router = Router();

router.post('/', WorkController.createWork);
router.put('/:id', WorkController.editWork);
router.delete('/:id', WorkController.deleteWork);
router.lock('/:id', WorkController.lockWork);
router.unlock('/:id', WorkController.unLockWork);
export default router;
