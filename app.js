var ws = new WebSocket('ws://localhost:7253');
var messageField = document.getElementById('message');
var button = document.getElementById('sendButton');

var chat = [];

messageField.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
        button.click();
    }
});

ws.onopen = function () {
    console.log('WebSocket connection is open...');

    button.addEventListener('click', sendText);
};

ws.onmessage = function (e) {
    var html = '';

    if (e.data.length > 0) {
        var data = JSON.parse(e.data);

        for (var i = 0; i < data.length; i++) {
            var date = new Date(data[i].date);

            html += '<p style="color:' + data[i].colour + '">[' + toShortDate(date) + '] ' + data[i].message + '</p>';
        }
    }
    document.getElementById('log').innerHTML = html;
};

ws.onclose = function () {
    console.log('WebSocket has disconnected');
};

function sendText() {
    var message = messageField.value;

    if (message.length > 0)
        chat.push(message);

    ws.send(message);

    messageField.value = '';
}

function toShortDate(date) {
    var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

    return hours + ':' + minutes + ':' + seconds;
}