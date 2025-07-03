const API_URL = "https://techwithron.vercel.app/api/chatbot"; // Your Vercel backend endpoint

class PortfolioChatbot {
    constructor() {
        this.isOpen = false;
        this.userEmail = null;
        this.init();
    }

    init() {
        this.createChatbotHTML();
        this.bindEvents();
    }

    createChatbotHTML() {
        const chatbotHTML = `
            <div id="chatbot-container" style="position:fixed;bottom:1.5rem;right:1.5rem;z-index:9999;">
                <div id="chat-icon" style="background:#06b6d4;color:#fff;border-radius:50%;padding:1rem;cursor:pointer;box-shadow:0 2px 8px #0002;transition:transform .3s;">
                    <svg width="24" height="24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke-width="2"/><circle cx="8" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="16" cy="12" r="1.5"/></svg>
                </div>
                <div id="chat-window" style="display:none;background:#fff;border-radius:1rem;box-shadow:0 2px 16px #0003;border:1px solid #e5e7eb;width:340px;height:480px;display:flex;flex-direction:column;">
                    <div style="background:#06b6d4;color:#fff;padding:1rem 1.2rem;border-radius:1rem 1rem 0 0;display:flex;justify-content:space-between;align-items:center;">
                        <span style="font-weight:bold;">Chat with Ron Jo</span>
                        <button id="close-chat" style="background:none;border:none;color:#fff;font-size:1.2rem;cursor:pointer;">×</button>
                    </div>
                    <div id="chat-messages" style="flex:1;padding:1rem;overflow-y:auto;">
                        <div style="background:#f1f5f9;border-radius:.75rem;padding:.75rem;max-width:80%;margin-bottom:.5rem;">
                            <span style="font-size:.95rem;color:#334155;">Hi! I'm Ron Jo's AI assistant. Ask me anything about Ron's experience, projects, or skills!</span>
                        </div>
                    </div>
                    <div id="email-modal" style="display:none;padding:1rem;border-top:1px solid #e5e7eb;">
                        <div style="font-size:.95rem;color:#64748b;margin-bottom:.5rem;">Please provide your email:</div>
                        <div style="display:flex;gap:.5rem;">
                            <input type="email" id="email-input" placeholder="your@email.com" style="flex:1;border:1px solid #cbd5e1;border-radius:.5rem;padding:.5rem;font-size:.95rem;">
                            <button id="submit-email" style="background:#06b6d4;color:#fff;padding:.5rem 1rem;border:none;border-radius:.5rem;cursor:pointer;">Send</button>
                        </div>
                    </div>
                    <div id="chat-input-container" style="padding:1rem;border-top:1px solid #e5e7eb;">
                        <div style="display:flex;gap:.5rem;">
                            <input type="text" id="chat-input" placeholder="Type your message..." style="flex:1;border:1px solid #cbd5e1;border-radius:.5rem;padding:.5rem;font-size:.95rem;">
                            <button id="send-message" style="background:#06b6d4;color:#fff;padding:.5rem 1rem;border:none;border-radius:.5rem;cursor:pointer;">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
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
        document.getElementById('send-message').addEventListener('click', () => this.sendMessage());
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        document.getElementById('submit-email').addEventListener('click', () => this.submitEmail());
        emailInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.submitEmail();
        });
    }

    toggleChat() {
        const chatWindow = document.getElementById('chat-window');
        this.isOpen = !this.isOpen;
        chatWindow.style.display = this.isOpen ? 'flex' : 'none';
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
        messageDiv.style.marginBottom = '.5rem';
        messageDiv.style.display = 'flex';
        messageDiv.style.justifyContent = sender === 'user' ? 'flex-end' : 'flex-start';
        const messageBubble = document.createElement('div');
        messageBubble.style.borderRadius = '.75rem';
        messageBubble.style.padding = '.75rem';
        messageBubble.style.maxWidth = '80%';
        messageBubble.style.background = sender === 'user' ? '#06b6d4' : '#f1f5f9';
        messageBubble.style.color = sender === 'user' ? '#fff' : '#334155';
        messageBubble.innerHTML = `<span style="font-size:.95rem;">${message}</span>`;
        messageDiv.appendChild(messageBubble);
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    showEmailCollection() {
        document.getElementById('email-modal').style.display = 'block';
        document.getElementById('chat-input-container').style.display = 'none';
    }

    hideEmailCollection() {
        document.getElementById('email-modal').style.display = 'none';
        document.getElementById('chat-input-container').style.display = 'block';
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
        typingDiv.style.marginBottom = '.5rem';
        typingDiv.innerHTML = `
            <div style="background:#f1f5f9;border-radius:.75rem;padding:.75rem;max-width:80%;color:#64748b;">
                <span>...</span>
            </div>
        `;
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
