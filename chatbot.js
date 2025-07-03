const API_URL = "https://techwithron.vercel.app/api/chatbot";

class PortfolioChatbot {
    constructor() {
        this.isOpen = false;
        this.userEmail = null;
        this.isFirstMessage = true;
        this.userName = null;
        this.init();
    }

    init() {
        this.createChatbotHTML();
        this.injectStyles();
        this.bindEvents();
        this.showWelcomePopup();
    }

    createChatbotHTML() {
        const chatbotHTML = `
            <div id="chatbot-container">
                <div id="chat-icon">
                    <img src="OrionAI.png" alt="OrionAI" />
                    <div id="chatbot-popup">Hey, I'm Orion! Chat with me!</div>
                </div>
                <div id="chat-window">
                    <div class="chat-header">
                        <span>OrionAI</span>
                        <button id="close-chat" title="Close">&times;</button>
                    </div>
                    <div id="chat-messages">
                        <div class="bot-message">Hi! I'm OrionAI, Ron Jo's AI assistant. Ask me anything about Ron's experience, projects, or skills!</div>
                    </div>
                    <div id="name-modal">
                        <div>Please enter your name:</div>
                        <div style="display:flex;gap:.5rem;">
                            <input type="text" id="name-input" placeholder="Your name">
                            <button id="submit-name">Send</button>
                        </div>
                    </div>
                    <div id="email-modal">
                        <div>Please provide your email:</div>
                        <div style="display:flex;gap:.5rem;">
                            <input type="email" id="email-input" placeholder="your@email.com">
                            <button id="submit-email">Send</button>
                        </div>
                    </div>
                    <div id="chat-input-container">
                        <input type="text" id="chat-input" placeholder="Type your message...">
                        <button id="send-message">Send</button>
                    </div>
                    <div class="chat-footer">
                        <span>AI chatbot developed by <a href="https://techwithron.co.in" target="_blank" rel="noopener" style="color:#111;text-decoration:underline;">techwithron</a></span>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    injectStyles() {
        const style = document.createElement('style');
        style.innerHTML = `
#chatbot-container {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    z-index: 9999;
    font-family: 'Segoe UI', Arial, sans-serif;
}
#chatbot-container #chat-icon {
    background: linear-gradient(135deg, #ff3576 0%, #7b2ff2 100%);
    border-radius: 50%;
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px #0002;
    cursor: pointer;
    position: relative;
    transition: transform .2s, box-shadow .2s;
    outline: none;
    border: none;
}
#chatbot-container #chat-icon img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
    display: block;
}
#chatbot-container #chat-icon:hover {
    transform: scale(1.08);
    box-shadow: 0 4px 16px #7b2ff244;
}
#chatbot-container #chatbot-popup {
    position: absolute;
    bottom: 70px;
    left: 50%;
    transform: translateX(-50%);
    background: #111;
    color: #fff;
    padding: 8px 16px;
    border-radius: 16px;
    font-size: 0.95rem;
    white-space: nowrap;
    box-shadow: 0 2px 8px #0004;
    opacity: 1;
    pointer-events: auto;
    transition: opacity 0.3s;
    z-index: 10000;
}
#chatbot-container #chatbot-popup.hidden {
    opacity: 0;
    pointer-events: none;
}
#chatbot-container #chat-window {
    display: none;
    flex-direction: column;
    background: #fff;
    border-radius: 1rem;
    box-shadow: 0 2px 16px #0003;
    border: 1px solid #e5e7eb;
    width: 340px;
    height: 500px;
    margin-bottom: 0.5rem;
    overflow: hidden;
}
#chatbot-container #chat-window.open {
    display: flex;
}
#chatbot-container .chat-header {
    background: #111;
    color: #fff;
    padding: 1rem 1.2rem;
    border-radius: 1rem 1rem 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    font-size: 1.1rem;
}
#chatbot-container #close-chat {
    background: none;
    border: none;
    color: #fff;
    font-size: 1.5rem;
    cursor: pointer;
    line-height: 1;
    transition: color .2s;
}
#chatbot-container #close-chat:hover, 
#chatbot-container #close-chat:focus {
    color: #ff3576;
}
#chatbot-container #chat-messages {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
    background: #f8fafc;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
#chatbot-container .bot-message, 
#chatbot-container .user-message {
    max-width: 80%;
    padding: .7rem 1rem;
    border-radius: 1rem;
    font-size: .97rem;
    word-break: break-word;
}
#chatbot-container .bot-message {
    background: #f1f1f1;
    color: #222;
    align-self: flex-start;
}
#chatbot-container .user-message {
    background: #fff;
    color: #111;
    border: 1px solid #e5e7eb;
    align-self: flex-end;
}
#chatbot-container #chat-input-container {
    display: flex;
    gap: .5rem;
    padding: 1rem;
    border-top: 1px solid #e5e7eb;
    background: #fff;
}
#chatbot-container #chat-input {
    flex: 1;
    border: 1px solid #cbd5e1;
    border-radius: .5rem;
    padding: .5rem;
    font-size: .97rem;
    outline: none;
    color: #111;
    background: #fff;
    transition: border-color .2s;
}
#chatbot-container #chat-input:focus {
    border-color: #111;
}
#chatbot-container #send-message {
    background: #111;
    color: #fff;
    padding: .5rem 1rem;
    border: none;
    border-radius: .5rem;
    cursor: pointer;
    font-size: .97rem;
    transition: background .2s, box-shadow .2s;
}
#chatbot-container #send-message:hover, 
#chatbot-container #send-message:focus {
    background: #222;
    box-shadow: 0 2px 8px #1112;
}
#chatbot-container #email-modal {
    display: none;
    padding: 1rem;
    border-top: 1px solid #e5e7eb;
    background: #fff;
    flex-direction: column;
    gap: .5rem;
}
#chatbot-container #email-input {
    flex: 1;
    border: 1px solid #cbd5e1;
    border-radius: .5rem;
    padding: .5rem;
    font-size: .97rem;
    outline: none;
    color: #111;
    background: #fff;
    transition: border-color .2s;
}
#chatbot-container #email-input:focus {
    border-color: #111;
}
#chatbot-container #submit-email {
    background: #111;
    color: #fff;
    padding: .5rem 1rem;
    border: none;
    border-radius: .5rem;
    cursor: pointer;
    font-size: .97rem;
    transition: background .2s, box-shadow .2s;
}
#chatbot-container #submit-email:hover, 
#chatbot-container #submit-email:focus {
    background: #222;
    box-shadow: 0 2px 8px #1112;
}
#chatbot-container #name-modal {
    display: none;
    padding: 1rem;
    border-top: 1px solid #e5e7eb;
    background: #fff;
    flex-direction: column;
    gap: .5rem;
}
#chatbot-container #name-input {
    flex: 1;
    border: 1px solid #cbd5e1;
    border-radius: .5rem;
    padding: .5rem;
    font-size: .97rem;
    outline: none;
    color: #111;
    background: #fff;
    transition: border-color .2s;
}
#chatbot-container #name-input:focus {
    border-color: #111;
}
#chatbot-container #submit-name {
    background: #111;
    color: #fff;
    padding: .5rem 1rem;
    border: none;
    border-radius: .5rem;
    cursor: pointer;
    font-size: .97rem;
    transition: background .2s, box-shadow .2s;
}
#chatbot-container #submit-name:hover, 
#chatbot-container #submit-name:focus {
    background: #222;
    box-shadow: 0 2px 8px #1112;
}
#chatbot-container .chat-footer {
    background: #f1f5f9;
    color: #222;
    text-align: center;
    font-size: .93rem;
    padding: .7rem 1rem;
    border-radius: 0 0 1rem 1rem;
    border-top: 1px solid #e5e7eb;
}
#chatbot-container .chat-footer a {
    color: #111;
}
        `;
        document.head.appendChild(style);
    }

    bindEvents() {
        const chatIcon = document.getElementById('chat-icon');
        const closeChat = document.getElementById('close-chat');
        const sendButton = document.getElementById('send-message');
        const chatInput = document.getElementById('chat-input');
        const submitEmail = document.getElementById('submit-email');
        const emailInput = document.getElementById('email-input');
        const submitName = document.getElementById('submit-name');
        const nameInput = document.getElementById('name-input');

        chatIcon.addEventListener('click', () => {
            this.toggleChat();
            this.hideWelcomePopup();
        });
        closeChat.addEventListener('click', () => this.toggleChat());
        sendButton.addEventListener('click', () => this.sendMessage());
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        submitEmail.addEventListener('click', () => this.submitEmail());
        emailInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.submitEmail();
        });
        submitName.addEventListener('click', () => this.submitName());
        nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.submitName();
        });
    }

    showWelcomePopup() {
        const popup = document.getElementById('chatbot-popup');
        if (popup) {
            popup.classList.remove('hidden');
        }
    }

    hideWelcomePopup() {
        const popup = document.getElementById('chatbot-popup');
        if (popup) {
            popup.classList.add('hidden');
        }
    }

    toggleChat() {
        const chatWindow = document.getElementById('chat-window');
        this.isOpen = !this.isOpen;
        chatWindow.classList.toggle('open', this.isOpen);
        if (this.isOpen) {
            this.hideWelcomePopup();
        }
    }

    async sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        if (!message) return;
        this.addMessage(message, 'user');
        input.value = '';
        this.showTypingIndicator();
        try {
            let response = await this.getAIResponse(message);
            this.isFirstMessage = false;
            this.hideTypingIndicator();
            if (response.response === "Before we continue, may I know your name?") {
                this.showNamePrompt();
                if (this.userName) {
                    response = await this.getAIResponse(message);
                    this.addMessage(response.response, 'bot');
                }
            } else if (response.needsEmailCollection) {
                this.showEmailCollection();
            } else {
                this.addMessage(response.response.replace(/LunaAI/g, 'OrionAI').replace(/Luna AI/g, 'Orion AI'), 'bot');
            }
        } catch (error) {
            this.hideTypingIndicator();
            this.addMessage('Sorry, I encountered an error. Please try again later.', 'bot');
        }
    }

    async getAIResponse(message) {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                message, 
                userEmail: this.userEmail,
                isFirstMessage: this.isFirstMessage,
                userName: this.userName
            })
        });
        if (!response.ok) throw new Error('API request failed');
        return await response.json();
    }

    addMessage(message, sender) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = sender === 'user' ? 'user-message' : 'bot-message';
        messageDiv.textContent = message;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    showEmailCollection() {
        document.getElementById('email-modal').style.display = 'flex';
        document.getElementById('chat-input-container').style.display = 'none';
    }

    hideEmailCollection() {
        document.getElementById('email-modal').style.display = 'none';
        document.getElementById('chat-input-container').style.display = 'flex';
    }

    async submitEmail() {
        const emailInput = document.getElementById('email-input');
        const email = emailInput.value.trim();
        if (!email || !this.isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        this.userEmail = email;
        this.hideEmailCollection();
        this.addMessage("Thank you! I'll forward your message to Ron.", 'bot');
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chat-messages');
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'bot-message';
        typingDiv.textContent = '...';
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) typingIndicator.remove();
    }

    showNamePrompt() {
        document.getElementById('name-modal').style.display = 'flex';
        document.getElementById('chat-input-container').style.display = 'none';
    }

    hideNamePrompt() {
        document.getElementById('name-modal').style.display = 'none';
        document.getElementById('chat-input-container').style.display = 'flex';
    }

    submitName() {
        const nameInput = document.getElementById('name-input');
        const name = nameInput.value.trim();
        if (!name) {
            alert('Please enter your name');
            return;
        }
        this.userName = name;
        this.hideNamePrompt();
        nameInput.value = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PortfolioChatbot();
});
