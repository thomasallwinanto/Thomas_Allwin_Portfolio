document.addEventListener('DOMContentLoaded', () => {
    // Inject the chatbot UI into the body
    const chatbotHtml = `
      <div id="chatbot-container" style="position: fixed; bottom: 20px; right: 20px; z-index: 1000; font-family: sans-serif;">
        <!-- Chatbot Window -->
        <div id="chatbot-window" style="
          display: none;
          width: 300px;
          height: 400px;
          background-color: var(--bg-color, white);
          color: var(--text-color, black);
          border: 1px solid #ccc;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          flex-direction: column;
          margin-bottom: 10px;
          overflow: hidden;
        ">
          <!-- Header -->
          <div style="background-color: #00bcd4; color: white; padding: 10px; font-weight: bold; display: flex; justify-content: space-between; align-items: center;">
            <span>Portfolio Assistant</span>
            <button id="chatbot-close-btn" style="background: none; border: none; color: white; cursor: pointer; font-weight: bold; font-size: 16px;">X</button>
          </div>
  
          <!-- Messages Box -->
          <div id="chatbot-messages" style="flex: 1; padding: 10px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; font-size: 14px;">
            <div style="align-self: flex-start; background-color: #eee; color: black; padding: 8px 12px; border-radius: 15px; max-width: 80%; word-wrap: break-word;">
              Hi! Ask me anything about Thomas or this portfolio.
            </div>
          </div>
  
          <!-- Input Area -->
          <div style="display: flex; border-top: 1px solid #ccc; padding: 10px; background-color: var(--bg-color, white);">
            <input 
              type="text" 
              id="chatbot-input"
              placeholder="Ask a question..."
              style="flex: 1; padding: 8px; border-radius: 4px; border: 1px solid #ccc; margin-right: 5px; color: black; font-size: 14px;"
            />
            <button id="chatbot-send-btn" style="padding: 8px 12px; background-color: #00bcd4; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px;">
              Send
            </button>
          </div>
        </div>
  
        <!-- Floating Button -->
        <button id="chatbot-toggle-btn" style="
          background-color: #00bcd4;
          color: white;
          border: none;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          font-size: 24px;
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: auto;
        ">
          💬
        </button>
      </div>
    `;
  
    document.body.insertAdjacentHTML('beforeend', chatbotHtml);
  
    // Logic
    const toggleBtn = document.getElementById('chatbot-toggle-btn');
    const closeBtn = document.getElementById('chatbot-close-btn');
    const chatWindow = document.getElementById('chatbot-window');
    const sendBtn = document.getElementById('chatbot-send-btn');
    const inputField = document.getElementById('chatbot-input');
    const messagesBox = document.getElementById('chatbot-messages');
  
    const toggleChat = () => {
      const isHidden = chatWindow.style.display === 'none';
      if (isHidden) {
        chatWindow.style.display = 'flex';
        toggleBtn.style.display = 'none';
        inputField.focus();
      } else {
        chatWindow.style.display = 'none';
        toggleBtn.style.display = 'flex';
      }
    };
  
    toggleBtn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);
  
    const addMessage = (text, sender) => {
      const msgDiv = document.createElement('div');
      msgDiv.style.alignSelf = sender === 'user' ? 'flex-end' : 'flex-start';
      msgDiv.style.backgroundColor = sender === 'user' ? '#00bcd4' : '#eee';
      msgDiv.style.color = sender === 'user' ? 'white' : 'black';
      msgDiv.style.padding = '8px 12px';
      msgDiv.style.borderRadius = '15px';
      msgDiv.style.maxWidth = '80%';
      msgDiv.style.wordWrap = 'break-word';
      msgDiv.innerText = text;
      messagesBox.appendChild(msgDiv);
      messagesBox.scrollTop = messagesBox.scrollHeight;
    };
  
    const handleSend = () => {
      const text = inputField.value.trim();
      if (!text) return;
  
      addMessage(text, 'user');
      inputField.value = '';
  
      // Mock response
      setTimeout(() => {
        addMessage("I'm a work-in-progress chatbot! Once connected to an AI API, I will be able to answer questions based strictly on the portfolio's content.", 'bot');
      }, 1000);
    };
  
    sendBtn.addEventListener('click', handleSend);
    inputField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSend();
    });
  });
  