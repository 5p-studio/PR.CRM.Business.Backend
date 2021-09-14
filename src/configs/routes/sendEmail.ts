import { Router } from 'express';
import scheduleSendEmailController from '@controllers/api/scheduleSendEmailController';

const router = Router();
router.post('/:time', scheduleSendEmailController.scheduleSendEmail);
export default router;
