import * as WebSocket from 'ws';
import { DateFormatter } from "./Helpers/DateFormatter";
import { Connection } from "./Server/Connection";
import { Room } from "./Chat/Room";

let connection = new Connection();
let room = new Room();

let WebSocketServer = WebSocket.Server;
let wss = new WebSocketServer({port: 7253});

wss.on('connection', handleConnection);

function handleConnection(ws) {

    console.log('Client connected');

    connection.addUser({
        name: 'Unknown',
        client: ws,
        colour: ''
    });

    room.addUser(connection.getUser(ws));

    ws.send(JSON.stringify(room.chat));

    ws.on('message', handleMessage);

    ws.on('close', handleClose);

    function handleMessage(request) {

        let parsedRequest = JSON.parse(request);
        let user = connection.getUser(ws);

        if (user.name === 'Unknown' && parsedRequest.name !== undefined && parsedRequest.name.length > 0)
            user.name = parsedRequest.name;

        let newMessage = {
            date: new Date(),
            message: parsedRequest.message,
            name: user.name,
            colour: user.colour
        };

        room.addMessage(newMessage);

        console.log('[' + new DateFormatter(newMessage.date).toShortDate() + '] - ' + newMessage.message);

        connection.broadcast(JSON.stringify(room.chat));
    }

    function handleClose() {

        console.log('Client disconnected');

        connection.removeUser(ws);
    }
}

console.log('WebSocket server listening for connection...');