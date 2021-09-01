import User from '@models/employees';
import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import settings from '@configs/settings';
import { Request } from 'express';

const jwtOptions = { 'passReqToCallback': true, 'jwtFromRequest': ExtractJwt.fromAuthHeaderAsBearerToken(), 'secretOrKey': settings.jwtSecret };
const strategy = new Strategy(jwtOptions, async (req: Request, jwtPayload:{id: number}, next:any) => {
  try {
    const user = await User.findByPk(jwtPayload.id);
    if (user) {
      req.currentUser = user;
      next(null, user);
    } else {
      next(null, false);
    }
  } catch (error) {
    console.log(error);
  }
});
passport.use(strategy);
export default passport;
