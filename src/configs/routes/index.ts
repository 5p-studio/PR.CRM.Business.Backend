import { Router } from 'express';
import ExampleRouting from './Example';
import employee from './employee';
import work from './work';
const router = Router();

router.use('/example', ExampleRouting);
router.use('/employee', employee);
router.use('/work', work);

export default router;
