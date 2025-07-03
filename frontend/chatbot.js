style.innerHTML = `
#chatbot-container {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    z-index: 9999;
    font-family: 'Segoe UI', Arial, sans-serif;
}
@media (max-width: 600px) {
    #chatbot-container {
        bottom: 0;
        right: 0;
        left: 0;
        width: 100vw !important;
        height: 100vh !important;
        margin: 0 !important;
        border-radius: 0 !important;
    }
    #chatbot-container #chat-window {
        width: 100vw !important;
        height: 100vh !important;
        min-width: 0 !important;
        min-height: 0 !important;
        border-radius: 0 !important;
        margin: 0 !important;
    }
    #chatbot-container #chat-icon {
        position: fixed;
        bottom: 1.5rem;
        right: 1.5rem;
    }
    #chatbot-container .chat-header,
    #chatbot-container .chat-footer {
        border-radius: 0 !important;
    }
    #chatbot-container #chat-messages {
        padding: 0.5rem !important;
        font-size: 1.05rem !important;
    }
    #chatbot-container #chat-input-container,
    #chatbot-container #email-modal {
        padding: 0.5rem !important;
    }
    #chatbot-container #chat-input,
    #chatbot-container #email-input {
        font-size: 1.1rem !important;
        padding: 0.7rem !important;
    }
    #chatbot-container #send-message,
    #chatbot-container #submit-email {
        font-size: 1.1rem !important;
        padding: 0.7rem 1.2rem !important;
    }
}
`; 