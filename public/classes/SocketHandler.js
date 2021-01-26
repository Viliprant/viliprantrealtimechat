class SocketHandler{
    constructor(username = ''){
        this.socket = io();
        this.username = username;
        if(username){
            this.changeUsername(username);
        }
    }

    onReceiveMessage(callback){
        this.socket.on('sentMessage', ({message, username}) => {
            const isOwner = this.username === username;
            callback({message, username, isOwner})
        });
    }

    sendMessage(message){
        this.socket.emit('message', message);
    }

    changeUsername(username){
        this.username = username;
        this.socket.emit('changeUsername', username);
    }

    onDisconnected(callback){
        this.socket.on('onConnected', callback);
    }

    onConnected(callback){
        this.socket.on('onDisconnected', callback);
    }

    onUsernameExist(callback){
        this.socket.on('onUsernameExist', callback);
    }
}

export default SocketHandler;