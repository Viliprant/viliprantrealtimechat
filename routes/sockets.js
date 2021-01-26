socketIds = {};

function ioStarted(io) {
    io.on('connection', function(socket) {
        socketIds[socket.id] = '';
        console.log(`Connected : ${socket.id}`);

        // console.log(socketIds)

        io.emit('onConnected', Object.keys(socketIds).length);

        socket.on('changeUsername', function(newUsername){
            isTook = false;
            for (username of Object.values(socketIds)){
                if (newUsername === username) {
                    isTook = true;
                    break;
                }
            }
            if(isTook)
            {
                console.log(`Cannot change username : ${newUsername} is already taken`);
                socket.emit('onUsernameExist');
            }
            else{
                socketIds[socket.id] = newUsername;
                console.log(`Username updated : ${socketIds[socket.id]}`)
                sendChangedUsername(socket, socketIds[socket.id])
            }
        })
        
        socket.on('message', function(message) {
            console.log('Message:', message);
            sendUserMessage(io, {
                message,
                'username' : socketIds[socket.id]
            }); 
        });

        socket.on('disconnect', () => {
            sendAdminMessage(socket, {
                'message' : `${socketIds[socket.id]} is disconnected !`,
            }, true);
            console.log(`Disconnected : ${socketIds[socket.id]}`);
            delete socketIds[socket.id];
            io.emit('onDisconnected', Object.keys(socketIds).length);
        });
    });
}

function sendMessage(sender, data, broadcast = false){
    if(broadcast){
        sender.broadcast.emit('sentMessage', data);
    }
    else{
        sender.emit('sentMessage', data)
    }
}

function sendChangedUsername(sender, newUsername){
    sendAdminMessage(sender, {
        'message' : `${newUsername} join us !`,
    }, true)
}

function sendUserMessage(sender, data){
    sendMessage(sender, data)
}

function sendAdminMessage(sender, data, broadcast = false){
    sendMessage(sender, {
        ...data,
        'username' : 'Sliministrator'
    }, broadcast)
}

module.exports = {
    start : ioStarted
}