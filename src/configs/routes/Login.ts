import { Router } from 'express';

import initPassportLocal from '@controllers/api/loginController';

var passport = require('passport');

const router = Router();

initPassportLocal();

router.post("/", passport.authenticate('local',{
  failureRedirect: "/",
  successRedirect: '/example'
}));
export default router;