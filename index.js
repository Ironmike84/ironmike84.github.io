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
app.get('/Movies/[id]/:name', (req, res) => {
    res.json(movieObject.find((movie) =>
    { return movie.name === req.params.name }));
   res.send('Here is the Movie wou were searching for!');
  });
  
//--------------------------------------------------------------------------------------// Find Actor
app.get('/Movies/[actors]/:name', (req, res) => {
    res.json(movieObject.find((actor) =>
      { return actor.name === req.params.name }));
     res.send(`Here is the Actor you were searching for! ${actor.name}.`);
  });

//--------------------------------------------------------------------------------------// Find Genre
app.get('/Movies/[genres]/:name', (req, res) => {
    res.json(movieObject.find((genre) =>
      { return genre.name === req.params.name }));
      res.send(`Here is the Genre you were searching for! ${genre.name}.`);
  });
   

//--------------------------------------------------------------------------------------// Find Actor Details
app.get('/Movies/[actors]/[id]/[bio]/:name', (req, res) => {
    res.json(moviesObject.find((actor) =>
      { return actor.bio === req.params.name }));
      res.send(`Here is the Genre you were searching for! ${actor.bio}.`);
  });


//-----------------------------------------------------------------------------------------------------// GET MOVIE TITLE
app.get('/Movies/:name', (req, res) => {
    res.json(movieObject.find( (movie) =>
      { return movie.name === req.params.name }));
  });
  let movieTitle = movieObject.find( (movie) =>
  { return movie.name === req.params.name });

if (movie) {
  movieTitle.name[req.params.name] = req.params.name;
  res.status(201).send( `Movie Title: '${req.params.name}`);
} else {
  res.status(404).send(`Movie Title: '${req.params.name}' was not found.`);
}

//--------------------------------------------------------------------------------------------------------// GET FAV MOVIE
app.get('/Movies/[favorites]/[movies]/:name', (req, res) => {
    res.json(movieObject.find((movie) =>
      { return movie.name === req.params.name }));
  });
  let favMovieName = movieObject.find( (movie) =>
  { return movie.name === req.params.name });

if (movie) {
  favMovieName.name[req.params.name] = req.params.name;
  res.status(201).send(`Movie Name: '${req.params.name}`);
} else {
  res.status(404).send(`Movie Name: '${req.params.name}' was not found.`);
}

//-----------------------------------------------------------------------------------------------------// POST NEW FAV MOVIE
  app.post('/Movies/[favorites]/[movies]/:name', (req, res) => {
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
app.get('/Movies/[favorites]/[actors]/:name', (req, res) => {
    res.json(movieObject.find( (actor) =>
      { return actor.name === req.params.name }));
  });

  let newFavActor = movieObject.find( (actor) =>
  { return newFavActor.name === req.params.name });

if (actor) {
  newFavActor.name[req.params.name] = req.params.name;
  res.status(201).send( `Actors Name: '${req.params.name}' was added.`);
} else {
  res.status(404).send(`Actors Name: '${req.params.name}' was not found.`);
}

//-----------------------------------------------------------------------------------------------------// POST NEW FAV ACTOR
app.post('/Movies/[favorites]/[actors]/:name', (req, res) => {
    let newActor = req.body;
  
    if(!newActor.name) {
      const message = 'Missing "Movie Name" in request body';
      res.status(400).send(message);
    } else {
      newActor.id = uuid.v4();
      movieObject.push(newActor);
      res.status(201).send(newActor);
    }
  });

//--------------------------------------------------------------------------------------// Delete Favorite Actor
app.delete('/Movies/[favorites]/[actors]/:name', (req, res) => {
    let actor = actors.find((actor) => { return actor.id === req.params.id });
  
    if (actor) {
      actors = Movies.filter((actor) => { return actor.id !== req.params.id });
      res.status(201).send(`Actor '${req.params.id}' was deleted.`);
    }
  });

//--------------------------------------------------------------------------------------// Delete Favorite Movie
app.delete('/Movies/[favorites]/[movies]/:name', (req, res) => {
    let movie = movieObject.find((movie) => { return movie.id === req.params.id });
  
    if (movie) {
      movies = movieObject.filter((movie) => { return movie.id !== req.params.id });
      movieObject.pop(movie)
      res.status(201).send(`Movie '${req.params.name}' was deleted.`);
    }
  });
  
//-----------------------------------------------------------------------------------------------------// ERROR MESSAGE
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });


//-----------------------------------------------------------------------------------------------------// PORT CALL
app.listen(PORT, ()=>(console.log(`Listening On Port: ${PORT}`)))