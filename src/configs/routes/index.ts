import { Router } from 'express';
import ExampleRouting from './Example';

import customer from './customer';
import employee from './employee';
import login from './Login';
import history from './history';
import sendemail from './sendEmail';
const router = Router();

router.use('/example', ExampleRouting);
router.use('/customer', customer);
router.use('/employee', employee);
router.use('/login', login);
router.use('/history', history);
router.use('/sendemail', sendemail);

export default router;
