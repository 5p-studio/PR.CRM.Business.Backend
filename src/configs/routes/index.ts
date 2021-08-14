import { Router } from 'express';
import ExampleRouting from './Example';

import customer from './customer';
import employee from './employee';
import login from './Login';
import history from './history';
const router = Router();

router.use('/example', ExampleRouting);
router.use('/customer', customer);
router.use('/employee', employee);
router.use('/login', login);
router.use('/history', history);

export default router;
