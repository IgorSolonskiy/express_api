import {Server} from 'socket.io';
import {onConnect} from '../middleware/socket.js';
import env from '../env.js';

export default {
  _io: null,

  initialize(server) {
    this._io = new Server(server, {
      cors: {
        origin: env.APP_URL,
        credentials: true,
      },
    });
    this._io.use(onConnect);
  },
};
