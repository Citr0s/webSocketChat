import * as WebSocket from 'ws';

var WebSocketServer = WebSocket.Server;
var wss = new WebSocketServer({port: 7253});
var chat = [];
var clients = [];
var colours = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#795548', '#795548'];

wss.broadcast = function broadcast(data) {
  for(var i = 0; i < clients.length; i++){

        clients[i].client.send(data);
  }
};

wss.on('connection', function(ws) {
    clients.push({
        client: ws,
        colour: colours[Math.floor(Math.random() * colours.length)]
    });

    console.log('Client connected');

    ws.send(JSON.stringify(chat));

  ws.on('message', function(message) {

      let newClient = {
          date: new Date(),
          message: message,
          colour: clientColourFor(ws)
      };

      chat.push(newClient);

      console.log('[' + newClient.date + '] - ' + newClient.message);

      wss.broadcast(JSON.stringify(chat));
  });

  ws.on('close', function(){
      removeClient(ws);

      console.log('Client disconnected');
  });
});

console.log('WebSocket server listening for connection...');

function clientColourFor(ws) {
    for(var i = 0; i < clients.length; i++){

        if(clients[i].client === ws)
            return clients[i].colour;
    }
}

function removeClient(ws) {
    for(var i = 0; i < clients.length; i++){

        if(clients[i].client === ws)
            clients.splice(i, 1);
    }
}