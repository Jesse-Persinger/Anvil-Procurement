const express = require('express');
const sequelize = require('./db'); 
const userRoutes = require('./Routes/userRoutes');
const authRoutes = require('./Routes/authRoutes');
const itemsRoute = require('./Routes/get');
const searchRoute = require('./Routes/search')
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors());

// Define routes and CRUD operations here...
app.use('/users', userRoutes);
app.use('/auth', authRoutes)
app.use('/api', itemsRoute);
app.use('/api/search', searchRoute);

// Start the server
const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});