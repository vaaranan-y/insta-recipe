const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  name: {type : String, default: ""},
  author: {type : String, default: ""},
  email: {type : String, default: ""},
  ingredients: Array,
  steps: Array,
  uploadDate: {type : String, default: ""},
  imageURL: {type : String, default: ""},
  originalURL: {type : String, default: ""}
}, {collection: 'recipedata'});

module.exports = Recipe = mongoose.model('Recipe', RecipeSchema);
