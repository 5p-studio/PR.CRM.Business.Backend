import { Router } from 'express';
import employeeController from '@controllers/api/employeeController';

const router = Router();

router.get('/', employeeController.getAllEmp);

router.get('/:id', employeeController.getOneEmp);

router.post('/', employeeController.createEmp);

router.put('/:id', employeeController.editEmp);

router.delete('/:id', employeeController.deleteEmp);

export default router;
