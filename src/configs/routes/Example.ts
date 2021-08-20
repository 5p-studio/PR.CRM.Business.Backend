import { Router } from 'express';
import ExampleController from '@controllers/api/ExampleController';
import pasport from '@middlewares/passport';

const router = Router();

router.get('/', pasport.authenticate('jwt', { session: false }), ExampleController.index);

export default router;
