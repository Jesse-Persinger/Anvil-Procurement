const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db'); 
const User = require('./models/User');

const app = express();
app.use(bodyParser.json());

// Define routes and CRUD operations here...

// Start the server
const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});