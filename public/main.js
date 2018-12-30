//Client Sided Code
var socket = io.connect('http://localhost:3000')

var message = document.getElementById('message')
    handle = document.getElementById('handle')
    send = document.getElementById('send')
    output = document.getElementById('output')
    sessionid = document.getElementById('session-id')
    clear = document.getElementById('clear')

send.addEventListener('click', () => {
    if(message.value === '' || handle.value === '') {
        alert('You cant have nothing as your name/message');
        return
    }
    socket.emit('message',{
        'message': message.value,
        'handle': handle.value
    });
});

clear.addEventListener('click', () => {
  output.innerHTML = ''
})

socket.on('message', (data) => {
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('init', (data) => {
    sessionid.innerHTML += 'Your Session ID: ' + data.id
    console.log(data.messages)
    for(var i = 0; i < data.messages.length; i++) {
        output.innerHTML += '<p><strong>' + data.messages[i].name + ': </strong>' + data.messages[i].message + '</p>';
    }
})
