// Variables which represents the API that I am building.
// The value is an import of the Express package, which is a function.
// Code has been refactored to make a variable for Express so we can call app.use to apply middleware.
const express = require('express');
const app = express();
const PORT = 8080;

// Applies middleware - every request that comes into the API will first go through this middleware.
// Converting the body to JSON making it available in POST callbacks.
app.use(express.json());
 
app.listen(
    PORT,
    () => console.log('API live on http://localhost:' + PORT)
);
/*
This creates the API but express returns a 404 error code because there isn't any API endpoints set up yet.
*/

// Creates an endpoint for the API.
// Sets up the server with the 'drake' endpoint.
// The request is handled by passing a callback function with request and repsonse objects as the second parameter.
app.get('/drake', (request, response) => {
    // Sends a status code for an 'ok' response and sends a data payload alongside it.
    response.status(200).send({
        song: 'One Dance',
        album: 'Views'
    })
});

// 'Create'/ add a new Drake song, in this case, to the server.
app.post('/drake/:id', (request, response) => {
    // Retrieve id from URL. The value of the id is made available through the request parameters object.
    const { id } = request.params;
    // Retrieve songTitle and album from request body.
    const { songTitle } = request.body;
    const { album } = request.body;

    // Check if the songTitle and the album exists in the request body
    if(!songTitle || !album){
        // Send back an error code and response if no songTitle or album is provided.
        return response.status(418).send({
            message: 'There must be a song title and an album'
        });
    }

    // Else, send a status code for an 'ok' response with the new song info.
    response.status(200).send({
        message: 'The Drake song: ' + songTitle + ' from ' + album + ' was added with the id: ' + id
    });
});