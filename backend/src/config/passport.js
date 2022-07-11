"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require('passport');
const passportJWT = require("passport-jwt");
const User_1 = __importDefault(require("../models/User"));
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'abcd'
}, function (jwtPayload, cb) {
    return User_1.default.findOne({ id: jwtPayload.id }, function (err, user) {
        console.log(user.name, err);
        if (err) {
            return cb(err, false);
        }
        if (user) {
            return cb(null, user);
        }
        else {
            return cb(null, false);
        }
    });
}));
