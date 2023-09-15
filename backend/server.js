const express = require('express');
const categoryRoutes = require('./routes/categoryRoutes');
const actorRoutes = require('./routes/actorRoutes');
const userRoutes = require('./routes/userRoutes');
const tvShowRoutes = require('./routes/tvShowRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(express.json());

app.use(cookieParser());
app.use(cors());
// app.use('/movies', movieRoutes);
app.use('/tv-shows', tvShowRoutes);
app.use('/actors', actorRoutes);
app.use('/categories', categoryRoutes);
app.use('/users', userRoutes);

const SERVER_PORT = process.env.SERVER_PORT || 3000;

app.listen(SERVER_PORT, () => {
  console.log('Server is running on port 3000');
  console.log("JWT Secret: ", process.env.JWT_SECRET);

});