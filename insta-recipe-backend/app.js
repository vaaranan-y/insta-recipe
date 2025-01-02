const express = require('express');
const connectDB = require('./config/db'); // use this component to connect to db, but wll not be found unless you install config (npm i config)
var cors = require('cors');
const userRoutes = require("./routes/api/users");
var recipeRoutes = require('./routes/api/recipes');

const app = express();
app.use('/api', recipeRoutes);

// For user data
app.use("/api/users", userRoutes);

// connect to database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!')); // handle get request at root directory, acts as entry point
// app.get('/home', (req, res) => res.send('Hello Home!')); // test example

const port = process.env.PORT || 8082; // port of heroku port or just localhost

app.listen(port, () => console.log(`Server running on port ${port}`));
