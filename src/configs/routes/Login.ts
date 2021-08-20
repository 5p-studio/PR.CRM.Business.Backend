import { Router } from 'express';
import session from '@controllers/api/SessionController';

const router = Router();
router.post('/', session.login);
export default router;
