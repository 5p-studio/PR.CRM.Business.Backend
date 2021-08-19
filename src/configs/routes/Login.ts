import { Router } from 'express';
import login from '@controllers/api/SessionController';

const router = Router();
router.post('/', login.login);
export default router;
