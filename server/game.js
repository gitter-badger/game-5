const Authentication = require('./socket/authentication');
const Assets = require('./socket/assets');

const wsEvents = require('ws-events');
const WebSocket = require('ws');

class Socket {
  constructor(port) {
    this.port = port;
    console.log(`Starting websocket server on port ${port}`);
  }

  /**
   * Create the new server with the port
   */
  start() {
    this.socket = new WebSocket.Server({ port: this.port });
    this.build();
  }

  /**
   * Initialize the connect with the methods
   */
  build() {
    this.socket.on('connection', Socket.connection);
  }

  /**
   * Connect all incoming websocket calls to their approrpriate methods
   *
   * @param {WebSocket} ws The websocket connection
   */
  static connection(ws) {
    console.log('Someone connected');

    // Event bus (for actions)
    const bus = wsEvents(ws);

    // 1. Player
    bus.on('player:login', incoming => Authentication.login(bus, incoming));

    // 2. Asset managment
    bus.on('client:load-data', () => Assets.loadData(bus));
  }
}

module.exports = Socket;
