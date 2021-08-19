import { Router } from 'express';
import ExampleRouting from './Example';
import employee from './employee';
import login from './Login';
const router = Router();

router.use('/example', ExampleRouting);
router.use('/employee', employee);
router.use('/login', login);
export default router;
