var passport = require('passport')
 , LocalStrategy = require('passport-local').Strategy;

  
var Employees = require("@database/model/employees");


 
let initPassportLocal = () => {
  passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  }, async (req, email, password, done)=> {
    try {
      let employees = await Employees.findOne({where : {email: email}});
      if (!employees) {
        return done(null, false);
      }

      if(employees.password!=password){
        return done(null, false);
      }
      
      return done(null, employees);
    } catch (error) {
      console.log(error);
      return done(null, false,);
    }
  }));
};



module.exports = initPassportLocal;

