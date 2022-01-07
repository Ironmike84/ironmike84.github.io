//===============================================// INDEX.js \\======================================================
//===========================================// MuVies MOVIE API \\==================================================
//===================================================================================================================

//-------------------------------------------------------------------------------------------------// IMPORTS 
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/MuVies', {useNewUrlParser: true});
const PORT = 8080
const morgan = require('morgan');
const passport = require('passport');


// =================================================================================================>// MODELS //
const Models = require('./models.js');
const Movies = Models.Movie;
const Users = Models.Users;
const Directors = Models.Directors;
const genres = Models.genres;
const favMovies = Models.favMovies;
//===================================================================================================//BODY Parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
    $push: {"FavoriteMovies":{}}
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
  favMovies.deleteOne({'_id.UserName': req.params.UserName, _id: req.params.id })
    .then((favMovie) => {
      if (!favMovie) {
        res.status(400).send('ID: ' + req.params.id + ' was not found');
      } else {
        res.status(200).send('ID: ' + req.params.id + ' was deleted.');
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
app.get('/users/:UserName',passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOne({ UserName: req.params.UserName })
    .then((Users) => {
      res.json(Users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});
//--------------------------------------------------------------------------------------------------// GET All Users
app.get('/users',passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.find()
    .then((Users) => {
      res.status(201).json(Users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});
//------------------------------------------------------------------------------------------------// CREATE NEW USER
app.post('/users/NewUser/:UserName', (req, res) => {
  Users.findOne({ UserName: req.body.UserName })
    .then((User) => {
      if (!User) {
        return res.status(400).send(req.body.UserName + 'already exists');
      } else {
        Users
          .create(
            { _id: req.body._id,
              UserName: req.body.UserName,
              Password: req.body.Password,
              Email: req.body.Email,
              Birthday: req.body.Birthday,
            FavoriteMovies:[req.body.favMovies],
            ImagePath: req.body.ImagePath,
          })
          .then((User) =>{res.status(201).json(User) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});
//-----------------------------------------------------------------------------------------------// UPDATE USER Info
app.put('/users/UpdateUser/:UserName', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndUpdate({ UserName: req.params.UserName }, 
      { $set:
      { UserName: req.body.UserName,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
        FavoriteMovies:[req.body.favMovies],
      ImagePath: req.body.ImagePath
    }},
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if(err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
  });
//----------------------------------------------------------------------------------------------------// DELETE User
app.delete('/users/remove/:UserName', passport.authenticate('jwt', { session: false }),(req, res) => {
    Users.deleteOne({ "_id.UserName": req.params.UserName })
      .then((User) => {
        if (!User) {
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
app.listen(PORT, ()=>(console.log(`Listening On Port: ${PORT}`)));