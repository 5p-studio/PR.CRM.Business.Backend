import { Router } from 'express';
import ExampleController from '@controllers/api/ExampleController';

const router = Router();

router.get('/', ExampleController.index);

export default router;
