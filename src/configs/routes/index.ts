import { Router } from 'express';
import ExampleRouting from './Example';

const router = Router();

router.use('/example', ExampleRouting);

export default router;
