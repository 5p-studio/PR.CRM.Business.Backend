import { Router } from 'express';
import ExampleRouting from './Example';
import LoginRouting from './Login';


const router = Router();

router.use('/example', ExampleRouting);
router.use('/login', LoginRouting);

export default router;
