const API_URL = "https://techwithron.vercel.app/api/chatbot";

class PortfolioChatbot {
    constructor() {
        this.isOpen = false;
        this.userEmail = null;
        this.init();
    }

    init() {
        this.createChatbotHTML();
        this.injectStyles();
        this.bindEvents();
    }

    createChatbotHTML() {
        const chatbotHTML = `
            <div id="chatbot-container">
                <div id="chat-icon">
                    <svg width="28" height="28" fill="none" stroke="currentColor"><circle cx="14" cy="14" r="13" stroke-width="2"/><circle cx="9" cy="14" r="2"/><circle cx="14" cy="14" r="2"/><circle cx="19" cy="14" r="2"/></svg>
                </div>
                <div id="chat-window">
                    <div class="chat-header">
                        <span>LunaAI</span>
                        <button id="close-chat" title="Close">&times;</button>
                    </div>
                    <div id="chat-messages">
                        <div class="bot-message">Hi! I'm LunaAI, Ron Jo's AI assistant. Ask me anything about Ron's experience, projects, or skills!</div>
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
                        <span>AI chatbot developed by <a href="https://techwithron.co.in" target="_blank" rel="noopener" style="color:#06b6d4;text-decoration:underline;">techwithron</a></span>
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
#chat-icon {
    background: #06b6d4;
    color: #fff;
    border-radius: 50%;
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px #0002;
    cursor: pointer;
    transition: transform .2s;
}
#chat-icon:hover {
    transform: scale(1.08);
}
#chat-window {
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
#chat-window.open {
    display: flex;
}
.chat-header {
    background: #06b6d4;
    color: #fff;
    padding: 1rem 1.2rem;
    border-radius: 1rem 1rem 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    font-size: 1.1rem;
}
#close-chat {
    background: none;
    border: none;
    color: #fff;
    font-size: 1.5rem;
    cursor: pointer;
    line-height: 1;
}
#chat-messages {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
    background: #f8fafc;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
.bot-message, .user-message {
    max-width: 80%;
    padding: .7rem 1rem;
    border-radius: 1rem;
    font-size: .97rem;
    word-break: break-word;
}
.bot-message {
    background: #e0f7fa;
    color: #334155;
    align-self: flex-start;
}
.user-message {
    background: #06b6d4;
    color: #fff;
    align-self: flex-end;
}
#chat-input-container {
    display: flex;
    gap: .5rem;
    padding: 1rem;
    border-top: 1px solid #e5e7eb;
    background: #fff;
}
#chat-input {
    flex: 1;
    border: 1px solid #cbd5e1;
    border-radius: .5rem;
    padding: .5rem;
    font-size: .97rem;
}
#send-message {
    background: #06b6d4;
    color: #fff;
    padding: .5rem 1rem;
    border: none;
    border-radius: .5rem;
    cursor: pointer;
    font-size: .97rem;
}
#email-modal {
    display: none;
    padding: 1rem;
    border-top: 1px solid #e5e7eb;
    background: #fff;
    flex-direction: column;
    gap: .5rem;
}
#email-input {
    flex: 1;
    border: 1px solid #cbd5e1;
    border-radius: .5rem;
    padding: .5rem;
    font-size: .97rem;
}
#submit-email {
    background: #06b6d4;
    color: #fff;
    padding: .5rem 1rem;
    border: none;
    border-radius: .5rem;
    cursor: pointer;
    font-size: .97rem;
}
.chat-footer {
    background: #f1f5f9;
    color: #64748b;
    text-align: center;
    font-size: .93rem;
    padding: .7rem 1rem;
    border-radius: 0 0 1rem 1rem;
    border-top: 1px solid #e5e7eb;
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

        chatIcon.addEventListener('click', () => this.toggleChat());
        closeChat.addEventListener('click', () => this.toggleChat());
        sendButton.addEventListener('click', () => this.sendMessage());
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        submitEmail.addEventListener('click', () => this.submitEmail());
        emailInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.submitEmail();
        });
    }

    toggleChat() {
        const chatWindow = document.getElementById('chat-window');
        this.isOpen = !this.isOpen;
        chatWindow.classList.toggle('open', this.isOpen);
    }

    async sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        if (!message) return;
        this.addMessage(message, 'user');
        input.value = '';
        this.showTypingIndicator();
        try {
            const response = await this.getAIResponse(message);
            this.hideTypingIndicator();
            if (response.needsEmailCollection) {
                this.showEmailCollection();
            } else {
                this.addMessage(response.response, 'bot');
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
            body: JSON.stringify({ message, userEmail: this.userEmail })
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
}

document.addEventListener('DOMContentLoaded', () => {
    new PortfolioChatbot();
});
