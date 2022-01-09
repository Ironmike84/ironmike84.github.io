
//================================================// PASSPORT \\===========================================================
//=========================================================================================================================

//----------------------------------------------------------------------------------------------------// IMPORTS Require
const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  Models = require('./models.js'),
  passportJWT = require('passport-jwt');

//-----------------------------------------------------------------------------------------------------//MODELS Import
let Users = Models.users,
  JWTStrategy = passportJWT.Strategy,
  ExtractJWT = passportJWT.ExtractJwt;
//----------------------------------------------------------------------------------------------------// LOCAL STRATEGY
  passport.use(new LocalStrategy({
  usernameField: 'UserName',
  passwordField: 'Password'
}, (UserName, Password, callback) => {
  console.log(UserName + '  ' + Password);
  Users.findOne({ UserName: UserName }, (error, user) => {
    if (error) {
      console.log(error);
      return callback(error);
    }

    if (!user) {
      console.log('Incorrect Username');
      return callback(null, false, {message: 'Incorrect Username or Password.'});
    }

    console.log('Logged In...');
    return callback(null, user);
  });
}));
//----------------------------------------------------------------------------------------------------// USE STRATEGY
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret'
}, (jwtPayload, callback) => {
  return Users.findById(jwtPayload._id)
    .then((user) => {
      return callback(null, user);
    })
    .catch((error) => {
      return callback(error)
    });
}));