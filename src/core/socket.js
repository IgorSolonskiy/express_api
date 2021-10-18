import {Server} from 'socket.io';
import {onConnect} from '../middleware/socket';
import env from '../env';

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
