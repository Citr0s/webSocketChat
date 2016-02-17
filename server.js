var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 7253}),
    chat;

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

wss.on('connection', function(ws) {
  console.log('Client connected');
  ws.on('message', function(message) {
      chat = message;
      ws.send(chat);
      wss.broadcast(chat);
  });
  ws.on('close', function(){
      console.log('Client disconnected');
  });
});

console.log('WebSocket server listening for connection...');
