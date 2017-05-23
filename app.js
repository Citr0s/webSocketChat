var ws = new WebSocket(WEB_SOCKET_HOST);
var nameField = document.getElementById('name');
var messageField = document.getElementById('message');
var button = document.getElementById('sendButton');
var savedName = localStorage.getItem('name');

if (savedName !== null) {
    if (savedName.length > 0)
        nameField.setAttribute('style', 'display:none;');
}

var chat = [];

nameField.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
        button.click();
    }
});

messageField.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
        button.click();
    }
});

ws.onopen = handleOpen;
ws.onmessage = handleMessage;
ws.onclose = handleClose;

function handleOpen() {
    console.log('WebSocket connection is open...');

    button.addEventListener('click', sendText);
}

function handleMessage(e) {
    var html = '';

    if (e.data.length > 0) {
        var data = JSON.parse(e.data);

        console.log(data);

        for (var i = 0; i < data.length; i++) {
            var date = new Date(data[i].date);

            html += '<p style="color:' + data[i].colour + '">[' + toShortDate(date) + '] ' + data[i].name + ' - ' + data[i].message + '</p>';
        }
    }
    document.getElementById('log').innerHTML = html;
}

function handleClose() {
    console.log('WebSocket has disconnected');
}

function sendText() {
    var request = {};

    var name = nameField.value;

    if (name.length > 0) {
        request.name = name;
        nameField.setAttribute('style', 'display:none;');
        localStorage.setItem('name', name);
        savedName = localStorage.getItem('name');
    }

    if (savedName.length > 0)
        request.name = savedName;

    var message = messageField.value;

    if (message.length > 0) {
        request.message = message;
        chat.push(request);
    }

    ws.send(JSON.stringify(request));

    messageField.value = '';
}

function toShortDate(date) {
    var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

    return hours + ':' + minutes + ':' + seconds;
}