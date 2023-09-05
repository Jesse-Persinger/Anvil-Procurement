const express = require('express');

const sequelize = require('./db'); 
const userRoutes = require('./Routes/userRoutes');

const app = express();
app.use(express.json());

// Define routes and CRUD operations here...
app.use('/users', userRoutes);


// Start the server
const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});