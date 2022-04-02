
//============================================// MODELS  \\============================================================

//------------------------------------------------------------------------------// IMPORTS Require
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//------------------------------------------------------------------------------// MOVIE MODEL SCHEMA
let movieSchema = mongoose.Schema({
        _id: {type: Number, required: false},
        Title: String,
        Description: String,
        Genre: String,
        Director: String,
        StarActor:String,
        SupportingActor: String,
        Cast: String,
        Rating: String,
        Release: String,
        ImagePath: String,
        Featured: Boolean
});
//------------------------------------------------------------------------------// USER MODEL SCHEMA

let usersSchema = mongoose.Schema({
  _id: {type: Object},
  UserName: {type: String, required: true},
  Password: {type: String, required: true},
  Email: {type: String, required: true},
  Birthday: Date,
  FavoriteMovies:[{type: Object }],
  ImagePath: String
});

usersSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

usersSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.Password);
};
//------------------------------------------------------------------------------// DIRECTOR MODEL SCHEMA
let directorSchema = mongoose.Schema({
  _id: {type: Object},
    Name: String,
    Bio: String,
    Birth: String,
    Death: String,
  ImagePath: String,
  Featured: Boolean,
  Movies: [{type: Object}]
});
//------------------------------------------------------------------------------// GENRE MODEL SCHEMA
let genreSchema = mongoose.Schema({
  _id: {type: Object},
  Name: String,
  Description: String
});
//------------------------------------------------------------------------------// FAVMOVIES MODEL SCHEMA
let favMoviesSchema = mongoose.Schema({
  _id: {type:Object},
  UserName: String,
  FavoriteMovies: [{_id:Object}]
})

//------------------------------------------------------------------------------// FAVMOVIES MODEL SCHEMA
let actorsSchema = mongoose.Schema({
  _id: {type: Object},
  Name: String,
  Bio: String,
  Birth: String,
  Death: String,
  ImagePath: String,
})

//------------------------------------------------------------------------------// MODELS Variables
  let Movie = mongoose.model('movie', movieSchema);
  let users = mongoose.model('users', usersSchema);
  let Directors = mongoose.model('Directors', directorSchema);
  let genres = mongoose.model('genres', genreSchema);
  let favMovies = mongoose.model('favMovies', favMoviesSchema);
  let actors = mongoose.model('actors', actorsSchema);

//------------------------------------------------------------------------------// EXPORT Models
  module.exports.movie = movie;
  module.exports.users = users;
  module.exports.Directors = Directors;
  module.exports.genres = genres;
  module.exports.favMovies = favMovies;
  module.exports.actors = actors;
