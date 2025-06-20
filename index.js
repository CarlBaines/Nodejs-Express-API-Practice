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

// GET request - retrieves data from the server.

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

// POST request - sends data to the server to create, update or delete a resource.

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

// Mock database for PUT method manipulation.
let songs = [
    { id: 1, songName: 'NOKIA', artist: 'Drake'},
    { id: 2, songName: 'Not Like Us', artist: 'Kendrick Lamar'},
    { id: 3, songName: 'One Dance', artist: 'Drake'}
];

// PUT request - used to send data to the server to create/update a resource.
app.put('/songs/:id', (request, response) => {
    const songID = parseInt(request.params.id);
    const {songName, artist} = request.body;
    // The .find method returns the first element in the array that matches the condition.
    // The arrow function takes each song object from the array and checks if the song's ID is equal to the desired songID.
    const song = songs.find(s => s.id === songID);

    if(song){
        // update song record in mock database.
        song.songName = songName;
        song.artist = artist;
        response.send(songs);
    }
    else{
        response.status(404).send('Song was not found');
    }
});    

// DELETE request - used to remove resources from the server.
app.delete('/songs/:id', (request, response) =>{
    console.log('DELETE request received for ID:', request.params.id); // Add this line
    const songID = parseInt(request.params.id);
    const songIndex = songs.findIndex(s => s.id === songID);
    if(songIndex != -1){
        songs.splice(songIndex, 1);
        response.send(songs);
    }
    else{
        response.status(404).send('Song was not found for deletion');
    }
});
