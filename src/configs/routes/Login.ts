import { Router } from 'express';
import login from '@controllers/api/LoginController';
//import initPassportLocal from '@controllers/api/a';

var passport = require('passport');

const router = Router();

//initPassportLocal();

router.post('/' , login.index);
export default router;