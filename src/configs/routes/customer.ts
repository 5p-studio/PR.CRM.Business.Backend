import { Router, Request, Response } from 'express';
import customerController from '@controllers/api/customerController';
import passport from '@middlewares/passport';

const router = Router();

router.get('/', (req: Request, res: Response) => customerController.getAllCustomer(req, res));
router.get('/excel/', (req: Request, res: Response) => customerController.exportToExcel(req, res));
router.get('/:id', passport.authenticate('jwt', { session: false }), customerController.getOneCustomer);
router.post('/', customerController.createCustomer);
router.put('/:id', customerController.editCustomer);
router.delete('/:id', customerController.deleteCustomer);

export default router;
