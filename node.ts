#!/usr/bin/env npx tsx

import app from './app';
import { createServer, type Server } from 'http';

const server: Server = createServer(app);
const port: number = app.settings['port'];

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error: NodeJS.ErrnoException) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    switch (error.code) {
        case 'EACCES':
            console.error(`${port} requires elevated privileges`);
            return process.exit(1);
        case 'EADDRINUSE':
            console.error(`${port} is already in use`);
            return process.exit(1);
    }

    throw error;
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr!.port;
    console.log('Listening on ' + bind);
}
