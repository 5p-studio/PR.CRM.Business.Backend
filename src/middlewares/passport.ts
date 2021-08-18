var passport = require('passport');

import  User from '@database/model/employees';
const passportJWT = require('passport-jwt');

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {'jwtFromRequest': '', 'secretOrKey': ''};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'khoabimat';

let strategy = new JwtStrategy(jwtOptions,async function(jwt_payload:{id: number}, next:any){
    console.log('payload received', jwt_payload);
     let user = await User.findOne({where:{id : jwt_payload.id}})
     //console.log('ff ',user);
    if (user) {
    
      next(null, user);
    } else {
     
      next(null, false);
    }
    
  });
  passport.use(strategy);

  export default passport;