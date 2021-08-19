import User from '@models/employees';

const passport = require('passport');

const passportJWT = require('passport-jwt');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = { 'jwtFromRequest': '', 'secretOrKey': '' };
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'khoabimat';

const strategy = new JwtStrategy(jwtOptions, async function (jwtPayload:{id: number}, next:any) {
  console.log('payload received', jwtPayload);
  const user = await User.findOne({ where: { id: jwtPayload.id } });
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
passport.use(strategy);

export default passport;
