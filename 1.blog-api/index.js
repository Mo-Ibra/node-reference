const bodyParser = require('body-parser');
const express = require('express');
const tutorialRoutes = require('./routes/tutorial.route');
const db = require('./models');

const app = express();

const PORT = 3000;

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// tutorials routes
app.use(tutorialRoutes);

// connection to mysql database
db.sequelize.sync({ force: false });  // Force: Dev Mode.

// listen to application
app.listen(PORT, () => console.log(`Your application is works on port: ${PORT}`));