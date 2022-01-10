//===============================================// INDEX.js \\======================================================
//===========================================// MuVies MOVIE API \\==================================================
//===================================================================================================================

//-------------------------------------------------------------------------------------------------// IMPORTS Require
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/MuVies', {useNewUrlParser: true});
const port = process.env.PORT || 8080;
const morgan = require('morgan');
const passport = require('passport');
const { check, validationResult } = require('express-validator');

// =================================================================================================>// MODELS Schema
const Models = require('./models.js');
const Movies = Models.Movie;
const users = Models.users;
const Directors = Models.Directors;
const genres = Models.genres;
const favMovies = Models.favMovies;
//===================================================================================================//BODY Parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const cors = require('cors');
let allowedOrigins = ['http://localhost:8080', 'mongodb://127.0.0.1:27017/MuVies', ];

app.use(cors({
  origin: (origin, callback) => {
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn’t found on the list of allowed origins
      let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message ), false);
    }
    return callback(null, true);
  }
}));
let auth = require('./auth')(app);
require('./passport');
//-----------------------------------------------------------------------------------------------------// USE MORGAN (Not sure WHY?)
app.use(morgan('public'));

//-----------------------------------------------------------------------------------------------------// EXPRESS-IN PUBLIC FOLDER
app.use(express.static('public'));

app.use('/public', express.static('public'));

//--------------------------------------------------------------------------------------------------// GET ALL Movies
app.get('/movies', passport.authenticate('jwt', { session: false }),(req, res) => {
  Movies.find()
    .then((Movies) => {
      res.status(201).json(Movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
})
//---------------------------------------------------------------------------------------------// GET Movie By Title
app.get('/Movies/:Title',passport.authenticate('jwt', { session: false }),(req, res) => {

    Movies.findOne({ Title: req.params.Title })
    .then((Movies) => {
      res.json(Movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
  });

  //--------------------------------------------------------------------------------------// GET Movie by Genre Name
app.get('/Movies/Genre/:Name',passport.authenticate('jwt', { session: false }),(req, res) => {

  Movies.findOne({ 'Genre.Name': req.params.Name })
  .then((Movies) => {
    res.json(Movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

  //------------------------------------------------------------------------------------// GET Movie by Director Name
  app.get('/Movies/Director/:Name',passport.authenticate('jwt', { session: false }),(req, res) => {

    Movies.findOne({ 'Director.Name': req.params.Name })
    .then((Movies) => {
      res.json(Movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
  });

//--------------------------------------------------------------------------------------------------// GET All Genres
app.get('/genres', passport.authenticate('jwt', { session: false }),(req, res) => {
  genres.find()
  .then((genres) => {
    res.status(201).json(genres);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

//----------------------------------------------------------------------------------------------------// GET One Genre
app.get('/genres/:Name',passport.authenticate('jwt', { session: false }),(req, res) => {
  genres.findOne({ Name: req.params.Name })
  .then((genres) => {
    res.json(genres);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});
//----------------------------------------------------------------------------------------------// GET All Directors
app.get('/directors',passport.authenticate('jwt', { session: false }),(req, res) => {
  Directors.find()
    .then((Directors) => {
      res.status(201).json(Directors);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});
//-------------------------------------------------------------------------------------------------// GET Director
app.get('/directors/:Name',passport.authenticate('jwt', { session: false }), (req, res) => {
    Directors.findOne({ Name: req.params.Name })
    .then((Directors) => {
      res.json(Directors);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});
//----------------------------------------------------------------------------------------------------// GET FAV MOVIE
app.get('/favMovies/:UserName',passport.authenticate('jwt', { session: false }), (req, res) => {
  favMovies.findOne({'_id.UserName': req.params.UserName })
  .then((favMovie) => {
    res.json(favMovie);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });

});

//--------------------------------------------------------------------------------------------------------// GET FAV MOVIE
app.get('/favMovies',passport.authenticate('jwt', { session: false }), (req, res) => {
  favMovies.find()
  .then((favMovies) => {
    res.json(favMovies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});


//---------------------------------------------------------------------------------------------// POST NEW FAV MOVIE
app.post('/favMovies/newFav/:UserName',passport.authenticate('jwt', { session: false }), (req, res) => {
  favMovies.findOneAndUpdate({ '_id.UserName': req.params.UserName }, {
    $push: {"FavoriteMovies":[{"_id": req.body._id,
                            "Title": req.body.Title,
                            "Genre": req.body.genres}]}
},
   { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});
//------------------------------------------------------------------------------------------// DELETE Favorite Movie
app.delete('/favMovies/:UserName/delete/:id',passport.authenticate('jwt', { session: false }), (req, res) => {
  favMovies.findOne({ '_id.UserName': req.params.UserName})
    .then((favMovies) => {

      if (!favMovies) {
        res.status(400).send('ID: ' + req.params._id + ' was not found!!');
      } else {
        favMovies.deleteOne({"FavoriteMovies":[{"_id:": `ObjectId:${req.params._id}`}]});
        res.status(200).send('ID: ' + req.params._id + ' was deleted!');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});
//===================================================================================================// USER REGISTRY
//===================================================================================================//


//--------------------------------------------------------------------------------------------// GET Users By Username
app.get('/users/:UserName', passport.authenticate('jwt', { session: false }),(req, res) => {
  users.findOne({ UserName: req.params.UserName })
    .then((Users) => {
      res.json(Users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});
//--------------------------------------------------------------------------------------------------// GET All Users
app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
  users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});
//------------------------------------------------------------------------------------------------// CREATE NEW USER
app.post('/Users/NewUser/:UserName', (req, res) => {
  [
    check('Username', 'Username is required').isLength({min: 5}),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
  ], (req, res) => {

  // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }}


    let hashedPassword = users.hashPassword(req.body.Password);
  users.findOne({ UserName: req.body.UserName }) // Search to see if a user with the requested username already exists
    .then((user) => {
      if (user) {
      //If the user is found, send a response that it already exists
        return res.status(400).send(req.body.UserName + ' already exists');
      } else {
        users
        .create(
          { _id: req.body._id,
            UserName: req.body.UserName,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday,
          FavoriteMovies:[req.body.favMovies],
          ImagePath: req.body.ImagePath,
        })
        .then((user) => { res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        });
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

//----------------------------------------------------------------------------------------------------// DELETE User
app.delete('/users/remove/:UserName', passport.authenticate('jwt', { session: false }),(req, res) => {
    users.deleteOne({ UserName: req.params.UserName })
      .then((users) => {
        if (!users) {
          res.status(400).send(req.params.UserName + ' was not found');
        } else {
          res.status(200).send(req.params.UserName + ' was deleted.');
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

  //-------------------------------------------------------------------------------------------------// ERROR MESSAGE
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Oh No!!! Something broke!');
  });
//-----------------------------------------------------------------------------------------------------// PORT CALL

app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});