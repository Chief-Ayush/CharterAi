import "../styles/ChatHeader.css";

function ChatHeader() {
  return (
    <div className="chat-header">
      <div className="header-content">
        <div className="header-icon">
          <span className="robot-icon">🤖</span>
        </div>
        <div className="header-info">
          <h1 className="header-title">Smart AI Chat</h1>
          <p className="header-subtitle">
            Intelligent Chat, Instant Solutions. Always Ready to Assist
            Immediately.
          </p>
        </div>
      </div>
      <button className="menu-button" aria-label="Menu">
        <span className="menu-icon">⋯</span>
      </button>
    </div>
  );
}

export default ChatHeader;
