import "../styles/ChatMessage.css";

function ChatMessage({ message }) {
  const isBot = message.sender === "bot";

  return (
    <div className={`message ${isBot ? "bot-message" : "user-message"}`}>
      {isBot && (
        <div className="message-avatar">
          <span className="avatar-icon">🤖</span>
        </div>
      )}
      <div className="message-content">
        <p className="message-text">{message.text}</p>
        <span className="message-time">
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}

export default ChatMessage;
