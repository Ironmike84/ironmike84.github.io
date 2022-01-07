const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/MuVies', { autoIndex: false });
let movieSchema = mongoose.Schema({
        _id: {type: Number, required: false},
        Title: String,
        Description: String,
        Genre: {
          _id: {type: Number, required: false},
          Name: String,
          Description: String
        },
        Director: {
          _id:{type: Number, required: false},
          Name: String,
          Bio: String,
          Birth: String,
          Death: String,
        },
        Rating: String,
        Release: String,
        ImagePath: String,
        Featured: Boolean
});


let userSchema = mongoose.Schema({
    _id: {type: Object},
      UserName: String,
      Password: String,
      Email: String,
      Birthday: Date, 
    FavoriteMovies:[{type: Object }],

    ImagePath: String
});



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


let genreSchema = mongoose.Schema({
  _id: {type: Object},
  Name: String,
  Description: String
});

let favMoviesSchema = mongoose.Schema({
  _id: {type:Object},
  UserName: String,
  FavoriteMovies: [{_id:Object}]
})


  let Movie = mongoose.model('Movie', movieSchema);
  let Users = mongoose.model('Users', userSchema);
  let Directors = mongoose.model('Directors', directorSchema);
  let genres = mongoose.model('genres', genreSchema);
  let favMovies = mongoose.model('favMovies', favMoviesSchema);

  module.exports.Movie = Movie;
  module.exports.Users = Users;
  module.exports.Directors = Directors;
  module.exports.genres = genres;
  module.exports.favMovies = favMovies;

