import * as WebSocket from 'ws';
import { DateFormatter } from "./Helpers/DateFormatter";
import { Connection } from "./Server/Connection";

let connection = new Connection();
let WebSocketServer = WebSocket.Server;
let wss = new WebSocketServer({port: 7253});
let chat = [];
let clients = [];
let colours = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#795548', '#795548'];

wss.on('connection', function (ws) {

    console.log('Client connected');

    connection.addUser({
        name: 'Unknown',
        client: ws,
        colour: colours[Math.floor(Math.random() * colours.length)]
    });

    ws.send(JSON.stringify(chat));

    ws.on('message', function (message) {

        let newMessage = {
            date: new Date(),
            message: message,
            colour: connection.getUser(ws).colour
        };

        chat.push(newMessage);

        console.log('[' + new DateFormatter(newMessage.date).toShortDate() + '] - ' + newMessage.message);

        connection.broadcast(JSON.stringify(chat));
    });

    ws.on('close', function () {

        console.log('Client disconnected');
        
        connection.removeUser(ws);
    });
});

console.log('WebSocket server listening for connection...');