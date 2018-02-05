const Socket = require('./server/socket');
require('dotenv').config();

// Initialize the websocket class
const socket = new Socket(9000);

// Start the websocket server.
socket.start();
