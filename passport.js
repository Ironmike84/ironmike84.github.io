
//================================================// PASSPORT \\===========================================================
//=========================================================================================================================

//----------------------------------------------------------------------------------------------------// IMPORTS Require
const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  Models = require('./models.js'),
  passportJWT = require('passport-jwt');

//-----------------------------------------------------------------------------------------------------//MODELS Import
let users = Models.users,
  JWTStrategy = passportJWT.Strategy,
  ExtractJWT = passportJWT.ExtractJwt;
//----------------------------------------------------------------------------------------------------// LOCAL STRATEGY
passport.use(new LocalStrategy({
  usernameField: 'UserName',
  passwordField: 'Password'
}, (UserName, Password, callback) => {
  console.log(UserName + '  ' + Password);
  users.findOne({ UserName: UserName }, (error, users) => {
    if (error) {
      console.log(error);
      return callback(error);
    }

    if (!users) {
      console.log('Incorrect Username!!');
      return callback(null, false, {message: 'Incorrect Username!!'});
    }

    if (!users.validatePassword(Password)) {
      console.log('incorrect password');
      return callback(null, false, {message: 'Incorrect Password!!'});
    }

    console.log('New User Created');
    return callback(null, users);
  });
}));
//----------------------------------------------------------------------------------------------------// USE STRATEGY
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret'
}, (jwtPayload, callback) => {
  return users.findById(jwtPayload._id)
    .then((user) => {
      return callback(null, user);
    })
    .catch((error) => {
      return callback(error)
    });
}));
