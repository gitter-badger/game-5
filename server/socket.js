const Authentication = require('./socket/authentication');
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

    const bus = wsEvents(ws);

    // eslint-disable-next-line
    bus.on('login', incoming => {

      const data = {
        username: incoming.username,
        password: incoming.password,
      };

      console.log(data);

      Authentication.login(bus, data);
    });
  }
}

module.exports = Socket;
