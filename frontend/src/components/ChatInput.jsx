import { useState } from "react";
import "../styles/ChatInput.css";

function ChatInput({ onSendMessage, isLoading }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="chat-input-container">
      <form onSubmit={handleSubmit} className="input-form">
        <div className="input-wrapper">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            disabled={isLoading}
            className="message-input"
            maxLength={500}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="send-button"
            aria-label="Send message"
          >
            <span className="send-icon">✈️</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatInput;
