
import { createServer } from 'node:http'
import app from "./app";
import socketService from './services/socket';
import config from './config';

const server = createServer(app);
socketService(server);

server.listen(config.port, () => {
    console.log('Server run...')
});