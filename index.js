const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const morgan = require('morgan');
const uuid = require('uuid');

let movieObject = [{}]

//-----------------------------------------------------------------------------------------------------// USE MORGAN (Not sure WHY?)
app.use(morgan('public'));

//-----------------------------------------------------------------------------------------------------// EXPRESS-IN PUBLIC FOLDER
app.use(express.static('public'));

app.use('/public', express.static('public'));

//-------------------------------------------------------------------------------------// GET ALL Movies
app.get('/Movies/:name', (req, res) => {
    res.json(movieObject)
    res.send('Here is the Movie wou were searching for!');
  })

//--------------------------------------------------------------------------------------// Single Movie
app.get('/Movies/:movie', (req, res) => {
    res.send('Here is the Movie wou were searching for!');
  });
  
//--------------------------------------------------------------------------------------// Find Actor
app.get('/Movies/actors/:actor', (req, res) => {
    res.send(`Here is the Actor you were searching for!`);
  });

//--------------------------------------------------------------------------------------// Find Genre
app.get('/Movies/genres/:genre', (req, res) => {
      res.send(`Here is the Genre you were searching for!`);
  });

//--------------------------------------------------------------------------------------// Find Actor Details
app.get('/Movies/:actors/bio/:name', (req, res) => {
      res.send(`Here is the Actors Bio you were Searching for!!`);
  });


//-----------------------------------------------------------------------------------------------------// GET MOVIE TITLE
app.get('/Movies/:title', (req, res) => { 
  res.send(`Here is the Actors Bio you were Searching for!!`);
});

//--------------------------------------------------------------------------------------------------------// GET FAV MOVIE
app.get('/Users/favorites/movies/:movie', (req, res) => {
  res.send(`Here is the Actors Bio you were Searching for!!`);
});

//-----------------------------------------------------------------------------------------------------// POST NEW FAV MOVIE
  app.post('/Users/favorites/movies/:movie', (req, res) => {
    let newFavMovie = req.body;
  
    if(!newFavMovie.name) {
      const message = 'Missing "Movie Name" in request body';
      res.status(400).send(message);
    } else {
      newFavMovie.id = uuid.v4();
      movieObject.push(newFavMovie);
      res.status(201).send(newFavMovie);
    }
  });
  
//--------------------------------------------------------------------------------------------------------// GET FAV ACTOR
app.get('/Users/favorites/actors/:actor', (req, res) => {
    res.send(`Here is the Actor you were Searching for!!`);
});

//-----------------------------------------------------------------------------------------------------// POST NEW FAV ACTOR
app.post('/Users/favorites/actors/:actor', (req, res) => {
    let newFavActor = req.body;
  
    if(!newFavActor.name) {
      const message = 'Missing "Actor Name" in request body';
      res.status(400).send(message);
    } else {
      newFavActor.id = uuid.v4();
      movieObject.push(newFavActor);
      res.status(201).send(newFavActor);
    }
  });

//--------------------------------------------------------------------------------------// Delete Favorite Actor
app.delete('/Users/favorites/actors/:actor', (req, res) => {
    let actor = actors.find((actor) => { return actor.id === req.params.id });
  
    if (actor) {
      favActors = Movies.filter((actor) => { return actor.id !== req.params.id });
      res.status(201).send(`Actor '${req.params.id}' was deleted.`);
    }
  });

//--------------------------------------------------------------------------------------// Delete Favorite Movie
app.delete('/Users/favorites/movies/:movie', (req, res) => {
    let movie = movieObject.find((movie) => { return movie.id === req.params.id });
  
    if (movie) {
      favMovies = movieObject.filter((movie) => { return movie.id !== req.params.id });
      movieObject.pop(movie)
      res.status(201).send(`Movie '${req.params.name}' was deleted.`);
    }
  });
  


//=================================================================================================== USER REGISTRY   

//-----------------------------------------------------------------------------------------------------// CREATE NEW USER
app.post('/Users/userNames/:username', (req, res) => {
    let newUsername = req.body;
  
    if(!newUsername.name) {
      const message = 'Missing "User Name" in request body';
      res.status(400).send(message);
    } else {
      newUsername.id = uuid.v4();
      movieObject.push(newUsername);
      res.status(201).send(newUsername);
      res.send('Successful registration!!!')
    }

  });


//---------------------------------------------------------------------------------// Allow users to update their user information
app.put('/Users/userNames/:username', (req, res) => {
    let newUsername = req.body;
  
    if(!newUsername.name) {
      const message = 'Missing "Movie Name" in request body';
      res.status(400).send(message);
    } else {
      newUsername.id = uuid.v4();
      movieObject.push(newUsername);
      res.status(201).send(newUsername);
      res.send('Successful Update!!!')
    }
    
  });


//--------------------------------------------------------------------------------------// Delete Favorite Movie
app.delete('/Users/favorites/movies/:movie', (req, res) => {
    let usersName = movieObject.find((username) => { return username.id === req.params.id });
  
    if (usersName) {
      usersName = movieObject.filter((username) => { return username.id !== req.params.id });
      movieObject.pop(usersName)
      res.status(201).send(`User '${req.params.id}' was deleted.`);
    }
  });
  

//-----------------------------------------------------------------------------------------------------// ERROR MESSAGE
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });


//-----------------------------------------------------------------------------------------------------// PORT CALL
app.listen(PORT, ()=>(console.log(`Listening On Port: ${PORT}`)))