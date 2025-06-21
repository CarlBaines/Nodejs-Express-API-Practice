const express = require('express');
// Creates a new router object.
const router = express.Router();

const games = [];

router.get('/', (request, response) =>{
    response.status(200).send({
        games: games,
        count: games.length
    });
});

router.post('/:id', (request, response) =>{
    const id = request.params.id;
    const { gameTitle, publisher } = request.body;
    if(!gameTitle || !publisher){
        return response.status(400).send('There must be a game title or publisher');
    }
    const newGame = {
        gameId: id,
        gameTitle: gameTitle,
        gamePublisher: publisher
    };
    games.push(newGame);
    response.status(201).send({
        message: newGame.gameTitle + ' was added successfully',
        game: newGame,
        count: games.length
    })
});

router.put('/:id', (request, response) => {
    const gameId = request.params.id;
    const { gameTitle, publisher } = request.body;
    const game = games.find(g => g.gameId === gameId);
    if(game){
        if(gameTitle){
            game.gameTitle = gameTitle;
        }
        if(publisher){
            game.gamePublisher = publisher;
        }
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

router.delete('/:id', (request, response) => {
    const gameID = request.params.id;
    const gameIndex = games.findIndex(g => g.gameId === gameID);
    if(gameIndex !== -1){
        games.splice(gameIndex, 1);
        response.status(200).send({
            message: 'Game was deleted successfully',
            count: games.length
        });
    }
    else{
        response.status(404).send('Game could not be deleted');
    }
});

// Holds the exported values and functions from the router object.
module.exports = router;