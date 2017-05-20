var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 7253});
var chat = [];

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

wss.on('connection', function(ws) {
    console.log('Client connected');

    ws.send(JSON.stringify(chat));

  ws.on('message', function(message) {

      chat.push(message);

      console.log(chat);

      wss.broadcast(JSON.stringify(chat));
  });

  ws.on('close', function(){
      console.log('Client disconnected');
  });
});

console.log('WebSocket server listening for connection...');
