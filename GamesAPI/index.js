const express = require('express');
const app = express();
const port = 8080;

// Middleware
app.use(express.json());

const games = [];

// GET endpoint to show all games.
app.get('/endpoint', (request, response) =>{
    response.status(200).send({
        games: games,
        count: games.length
    });
});

app.post('/endpoint/games/:id', (request, response) =>{
    const id = request.params.id;
    const { gameTitle, publisher } = request.body;
    if(!gameTitle || !publisher){
        return response.status(400).send('There must be a game title or publisher');
    }
    // Make newGame object.
    const newGame = {
        gameId: id,
        gameTitle: gameTitle,
        gamePublisher: publisher
    };
    // push to the games array.
    games.push(newGame);
    // send success code.
    response.status(201).send({
        message: newGame.gameTitle + ' was added successfully',
        game: newGame,
        count: games.length
    })
});

// Tests PUT route
app.put('/test', (request, response) => {
    response.send('PUT IS WORKING');
});

app.put('/endpoint/games/:id', (request, response) => {
    // Code to search for the record (if any) under the ID and update it.
    const gameId = request.params.id;
    const { gameTitle, publisher } = request.body;
    // Check if the id exists within the games array.
    // Takes each game object from the array and checks if the id of the game is equal to the id captured from the URL.
    const game = games.find(g => g.gameId === gameId);
    if(game){
        // Update the record if null checks are passed.
        if(gameTitle){
            game.gameTitle = gameTitle;
        }
        if(publisher){
            game.gamePublisher = publisher;
        }
        // Send success response
        response.status(200).send({
            message: 'Game updated successfully',
            game: game,
            count: games.length
        });
    }
    else{
        response.status(400).send('Game was not found');
    }
});

app.delete('/endpoint/games/:id', (request, response) => {
    // Retrieve the gameID
    const gameID = request.params.id;
    const gameIndex = games.findIndex(g => g.gameId === gameID);
    if(gameIndex !== -1){
        games.splice(gameIndex, 1);
        // Send success response
        response.status(200).send({
            message: 'Game was deleted successfully',
            count: games.length
        });
    }
    else{
        response.status(404).send('Game could not be deleted');
    }
});

// Starts the server
app.listen(
    port,
    () => console.log("API is live at http://localhost:" + port)
);
