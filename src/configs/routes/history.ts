import { Router } from 'express';
import historyController from '@controllers/api/historyController';

const router = Router();

router.get('/', historyController.getAllHistory);

export default router;
