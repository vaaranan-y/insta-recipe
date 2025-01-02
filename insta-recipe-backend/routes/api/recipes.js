// routes/api/recipes.js
const auth = require("../../validation/auth");
const express = require('express');
const router = express.Router(); // to define endpoitns for client requests
 // The following is for POST requests in JSON
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
var cors = require('cors');

// Load Recipe model
const Recipe = require('../../models/Recipe');

router.use(cors({ origin: true, credentials: true }));

// GET REQUESTS

// @route GET api/books/test
// @description tests books route
// @access Public
router.get('/test', auth, (req, res) => {
	res.status(200).send("Welcome 🙌 ");
  });

// @route GET api/books
// @description Get all books
// @access Public
router.get('/recipes', auth, (req, res) => {
	Recipe.find().then(recipe => res.json(recipe)).catch(err => res.status(404).json({ norecipesfound: 'No Recipes found' }));
});

// @route GET api/books/:id
// @description Get single book by id
// @access Public
router.get('/:id', auth, (req, res) => {
	Recipe.findById(req.params.id)
	.then(recipe => res.json(recipe))
	.catch(err => res.status(404).json({ norecipesfound: 'No Recipe found' }));
});

// POST REQUESTS

// @route POST api/books
// @description add/save book
// @access Public
router.post('/', (req, res) => {
	const recipe = new Recipe( // for passing data as JSON body text
	{
		name: req.body.name,
		author: req.body.author,
		email: req.body.email,
		ingredients: req.body.ingredients,
		steps: req.body.steps,
		uploadDate: req.body.uploadDate,
		imageURL: req.body.imageURL,
		originalURL: req.body.originalURL

	});
	
	Recipe.create(recipe)
	.then(recipe => res.json({ msg: 'Recipe added successfully' }))
	.catch(err => res.status(400).json({ error: 'Unable to add this recipe' }));
});

// PUT REQUESTS
// @route GET api/books/:id
// @description Update book
// @access Public
router.put('/:id', (req, res) => {
	// const recipe = new Recipe( // for passing data as JSON body text
	// {
	// 	name: req.body.name,
	// 	author: req.body.author,
	// 	ingredients: req.body.ingredients,
	// 	steps: req.body.steps,
	// 	timers: req.body.timers,
	// 	imageURL: req.body.imageURL,
	// 	originalURL: req.body.originalURL

	// });
  Recipe.findByIdAndUpdate(req.params.id, req.body) // You can use req.body for PUT requests
    .then(recipe => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// DELETE REQUEST
// @route GET api/books/:id
// @description Delete book by id
// @access Public
router.delete('/:id', (req, res) => {
  Recipe.findByIdAndRemove(req.params.id, req.body)
    .then(book => res.json({ mgs: 'Recipe entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a recipe' }));
});

module.exports = router;