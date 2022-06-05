const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const authRoutes = require('./routes/auth.routes');

const app = express();

const PORT = process.env.PORT || 3000;

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to Database
db.sequelize.sync({ force: true });

// Routes
app.use(authRoutes);

app.listen(PORT, () => console.log(`Application works on Port: ${PORT}`));