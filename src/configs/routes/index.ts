import { Router } from 'express';
import ExampleRouting from './Example';
import employee from './employee';
const router = Router();

router.use('/example', ExampleRouting);
router.use('/employee', employee);

export default router;
