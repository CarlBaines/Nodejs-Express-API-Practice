const express = require('express');
const app = express();
const PORT = 8080;

// Adds middleware.
app.use(express.json());

app.get('/', (request, response) => {
    response.send('API is working!');
});

// Imports routes by specifying their paths.
const gamesRoute = require('./routes/games');
const musicRoute = require('./routes/music');

// Mounts routers to the games and music endpoints.
app.use('/games', gamesRoute);
app.use('/music', musicRoute);

app.listen(PORT, () => {
    console.log('API live on http://localhost:' + PORT)
});