var ws = new WebSocket('ws://localhost:7253'),
    button = document.getElementById('sendButton'),
    clearButton = document.getElementById('clearButton'),
    chat = [];

ws.onopen = function(){
  console.log('WebSocket connection is open...');
  button.addEventListener('click', sendText);
  ws.send(chat);

  function sendText(){
    if(chat != ''){
      chat = JSON.parse(chat);
      chat.push(document.getElementById('message').value);
    }else{
      chat.push(document.getElementById('message').value);
    }
    chat = JSON.stringify(chat);
    ws.send(chat);
    document.getElementById('message').value = '';
  }
};

ws.onmessage = function(e){
  var html = '';
  console.log(e.data);
  if(e.data != ''){
      var data = JSON.parse(e.data);
      for(var i = 0; i < data.length; i++){
        html += data[i] + '<br>';
      }
  }
  document.getElementById('log').innerHTML = html;
};

ws.onclose = function(){
  console.log('WebSocket has disconnected');
};
