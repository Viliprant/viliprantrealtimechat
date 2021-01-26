class Message{
    constructor(message, username, isOwner = false, timestamp = Date.now()) {
        this.message = message;
        this.username = username;
        this.timestamp = timestamp;
        this.isOwner = isOwner;
        this.generateElement();
    }

    generateElement(){
        this.element = document.createElement('p')

        if(this.username === 'Sliministrator')
        {
            this.element.textContent = `${this.message}`;
            this.element.classList.add('slime-message')
        }
        else{
            const usernameElement = document.createElement('span');
            usernameElement.textContent = this.username;
            usernameElement.classList.add('bold');
            this.element.append(usernameElement, ` : ${this.message}`);

            if(this.isOwner)
            {
                this.element.classList.add('owner')
            }
        }
    }
}

export default Message;