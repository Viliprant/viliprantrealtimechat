import Message from './classes/Message.js'
import SocketHandler from './classes/SocketHandler.js'

const app = document.getElementById('app')
const formMessage = document.getElementById('form-message')
const formUsername = document.getElementById('form-username')
const modal = document.getElementById('modal')
const messageInput = document.getElementById('message-input')
const usernameInput = document.getElementById('username-input')
const errorMessageElement = document.getElementById('toast-error-message')
const errorMessageWrapper = document.getElementById('toast-error')

// MOBILE HEIGHT (URL BAR)
app.style.height = `${window.innerHeight}px`;

let username = '';
const socketHandler = new SocketHandler()

// Send a message
formMessage.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if(username){
        if(messageInput.value.trim().length > 0){
            socketHandler.sendMessage(messageInput.value);
        }
    }

    messageInput.value = '';
    messageInput.focus();
});

// setTimeout
let willHide;

// Send username
formUsername.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if(usernameInput.value.trim().length > 0){
        username = usernameInput.value;
        socketHandler.changeUsername(username);
        socketHandler.onUsernameExist(() => {
            modal.classList.add('show')
            usernameInput.focus();
            errorMessageElement.textContent = "Username already exists."
            errorMessageWrapper.classList.add('show');
            if(willHide) {
                clearTimeout(willHide);
            }
            willHide = setTimeout(() => {
                errorMessageWrapper.classList.remove('show');
            }, 3000)
        });
        messageInput.focus();
        modal.classList.remove('show')
    }
});

socketHandler.onReceiveMessage(displayMessage);

socketHandler.onConnected(displayNbUser);
socketHandler.onDisconnected(displayNbUser);

if(username){
    socketHandler.changeUsername(username)
}
else{
    usernameInput.focus()
    modal.classList.add('show')
}

function displayMessage({message, username, isOwner}){
    const chatMessages = document.getElementById('chat-messages')

    const newNessage = new Message(message, username, isOwner)
    chatMessages.append(newNessage.element);
    chatMessages.scrollTo(0, chatMessages.scrollHeight)
}

function displayNbUser(nbUser){
    const nbUserElement = document.getElementById('nb-user')
    nbUserElement.textContent = nbUser
}