const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const path = require('path'); // Add path module
const app = express();
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const mapsRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');

connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static('frontend/dist')); // Serve frontend files

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.use('/api/users', userRoutes); // Update route to include /api
app.use('/api/captains', captainRoutes); // Update route to include /api
app.use('/api/maps', mapsRoutes); // Update route to include /api
app.use('/api/rides', rideRoutes); // Update route to include /api

module.exports = app;
