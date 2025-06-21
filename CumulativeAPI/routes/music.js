const express = require('express');
// Creates a new router object.
const router = express.Router();

let songs = [
    { id: 1, songName: 'NOKIA', artist: 'Drake'},
    { id: 2, songName: 'Not Like Us', artist: 'Kendrick Lamar'},
    { id: 3, songName: 'One Dance', artist: 'Drake'}
];

router.get('/', (request, response) => {
    response.status(200).send({
        songs: songs,
        count: songs.length
    })
});

router.post('/:id', (request, response) => {
    const { id } = request.params;
    const { songTitle } = request.body;
    const { album } = request.body;

    if(!songTitle || !album){
        return response.status(418).send({
            message: 'There must be a song title and an album'
        });
    }

    response.status(200).send({
        message: 'The Drake song: ' + songTitle + ' from ' + album + ' was added with the id: ' + id
    });
});

router.put('/:id', (request, response) => {
    const songID = parseInt(request.params.id);
    const {songName, artist} = request.body;
    const song = songs.find(s => s.id === songID);

    if(song){
        song.songName = songName;
        song.artist = artist;
        response.send(songs);
    }
    else{
        response.status(404).send('Song was not found');
    }
});    

router.delete('/:id', (request, response) =>{
    const songID = parseInt(request.params.id);
    const songIndex = songs.findIndex(s => s.id === songID);
    if(songIndex != -1){
        songs.splice(songIndex, 1);
        response.send(songs);
    }    else{
        response.status(404).send('Song was not found for deletion');
    }
});

// Holds the exported values and functions from the router object.
module.exports = router;