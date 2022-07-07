const passport = require('passport');
const passportJWT = require("passport-jwt");
import User from '../models/User';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey   : 'abcd'
},
function (jwtPayload: any, cb: any) {
  return User.findOne({ id: jwtPayload.id }, function (err: any, user: any) {
    console.log(user.name, err);
    if (err) {
      return cb(err, false);
    }
    if (user) {
      return cb (null, user);
    } else {
      return cb (null, false);
    }
  });
  }
));