import { Router } from 'express';
import ProcessController from '@controllers/api/processController';

const router = Router();

router.post('/', ProcessController.createProcess);
router.put('/:id', ProcessController.editProcess);
router.delete('/:id', ProcessController.deleteProcess);
router.patch('/:id/lock', ProcessController.lockProcess);
router.patch('/:id/unlock', ProcessController.unLockProcess);
export default router;
