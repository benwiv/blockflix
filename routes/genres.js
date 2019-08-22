const express = require('express');
const router = express.Router();


//   DATA
const genres = [
  {id: 1, name: 'Horror'},
  {id: 2, name: 'Sci-Fi'},
  {id: 3, name: 'Drama'},
  {id: 4, name: 'Comedy'},
  {id: 5, name: 'Documentary'},
  {id: 6, name: 'Thriller'},
  {id: 7, name: 'Action'},
  {id: 8, name: 'Historical'},
  {id: 9, name: 'Adventure'},
  {id: 10, name: 'Western'},
  {id: 11, name: 'Musical'},
  {id: 12, name: 'Fantasy'},
  {id: 13, name: 'Family'},
  {id: 14, name: 'Teen'},
];

//   GET for Genres
router.get('/', (req, res) => {
  res.send(genres);
});

//   GET for Genre by ID
router.get('/:id', (req, res) => {
  const genre = genres.find( (genre) => {
    return genre.id === parseInt(req.params.id);
  });

  if (!genre) {
    res.status(404).send(`ERROR CODE 404: this genre does not exist in our database`)
    return;
  };

  res.send(genre);
});

//   POST for Genres
router.post('/', (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    res.status(400).send(`ERROR 400: ${error.message}`);
    return;
  };

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };

  genres.push(genre)
  res.send(genre);
})

//   PUT for Genres
router.put('/:id', (req, res) => {
  const genre = genres.find( (genre) => {
    return genre.id === parseInt(req.params.id);
  });

  if (!genre) {
    res.status(404).send(`ERROR CODE 404: this genre does not exist in our database`)
    return;
  };

  const { error } = validateGenre(req.body);
  if (error) {
    res.status(400).send(`ERROR CODE 400: ${error.message}`);
    return;
  };

  genre.name = req.body.name;

  res.send(genre);
});

//   DELETE for Genres
router.delete('/:id', (req, res) => {
  const genre = genres.find( (genre) => {
    return genre.id === parseInt(req.params.id);
  });

  if (!genre) {
    res.status(404).send(`ERROR CODE 404: this genre does not exist in our database`);
    return;
  }

  const genreIndex = genres.indexOf(genre);

  genres.splice(genreIndex, 1);

  res.send(genre);
});

module.exports = router;