var ws = new WebSocket('ws://localhost:7253');
var button = document.getElementById('sendButton');
var chat = [];

ws.onopen = function(){
  console.log('WebSocket connection is open...');

  button.addEventListener('click', sendText);
};

ws.onmessage = function(e){
    var html = '';

    if(e.data.length > 0){
        var data = JSON.parse(e.data);

        for(var i = 0; i < data.length; i++){
        html += '<p style="color:' + data[i].colour + '">' + data[i].message + '</p>';
        }
    }
  document.getElementById('log').innerHTML = html;
};

ws.onclose = function(){
  console.log('WebSocket has disconnected');
};

function sendText(){
    var message = document.getElementById('message').value;

    if(message.length > 0)
        chat.push(message);

    ws.send(message);

    document.getElementById('message').value = '';
}