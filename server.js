const Game = require('./server/game');
require('dotenv').config();

// Initialize the Game class with port number
const game = new Game(9000);

// Start the game server.
game.start();
