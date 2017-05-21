import * as WebSocket from 'ws';
import { Connection } from "./Server/Connection";

let connection = new Connection();

let WebSocketServer = WebSocket.Server;
let wss = new WebSocketServer({port: 7253});

wss.on('connection', connection.handle);

console.log('WebSocket server listening for connection...');