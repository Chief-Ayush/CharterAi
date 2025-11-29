import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "../styles/ChatMessage.css";

function ChatMessage({ message }) {
  const isUser = message.sender === "user";

  return (
    <div className={`message ${isUser ? "user-message" : "bot-message"}`}>
      <div className="message-content">
        <ReactMarkdown
          children={message.text} // message.text contains markdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
        />
      </div>
    </div>
  );
}

export default ChatMessage;
