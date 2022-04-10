const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { deleteOne } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })

  .then(() => {
    return Recipe.create({
      title: 'Tortilla de patatas',
      level: 'Amateur Chef',
      ingredients: ['potatoes', 'eggs'],
      cuisine: 'Spain',
      dishType: 'main_course',
      image:
        'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
      duration: 30,
      creator: 'Chef Rafa'
    });
  })

  .then((newRecipe) => {
    return console.log(`The ${newRecipe.title} has been created`);
  })

  .then(() => {
    return Recipe.insertMany(data);
  })

  .then((data) => {
    data.map((element) => console.log(`The Recipes: ${element.title}`));
  })

  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 },
      { new: true }
    );
  })

  .then((updatedRecipe) => console.log('Updated recipe:', updatedRecipe))

  .then(() => {
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })

  .then((deletedRecipe) => console.log('Deleted recipe:', deletedRecipe))

  .then(() => {
    mongoose.connection.close();
  })

  .then(() => {
    console.log('Disconnected');
  })

  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
