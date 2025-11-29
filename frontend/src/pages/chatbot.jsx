import { useState, useEffect } from "react";
import "../styles/chatbot.css";
import Navbar from "../components/Navbar";
import ChatHeader from "../components/ChatHeader";
import ChatMessages from "../components/ChatMessages";
import ChatInput from "../components/ChatInput";

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! How can I help you?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "morning"
  );

  // Apply theme to chatbot container on mount and when theme changes
  useEffect(() => {
    const chatbotContainer = document.querySelector(".chatbot-container");
    if (chatbotContainer) {
      chatbotContainer.classList.remove(
        "theme-morning",
        "theme-evening",
        "theme-night"
      );
      chatbotContainer.classList.add(`theme-${theme}`);
    }
  }, [theme]);

  const handleThemeToggle = () => {
    const themes = ["morning", "evening", "night"];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:4000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();

      if (response.ok) {
        const botMessage = {
          id: messages.length + 2,
          text:
            data.reply ||
            "I didn't understand that. Could you please rephrase?",
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        const errorMessage = {
          id: messages.length + 2,
          text:
            data.reply || "Sorry, I encountered an error. Please try again.",
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        id: messages.length + 2,
        text: "Sorry, I'm having trouble connecting to the server. Please make sure the backend is running.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`chatbot-container theme-${theme}`}>
      {/* Animated background shapes for consistency */}
      <div className="floating-shapes-bg">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
        <div className="floating-shape shape-5"></div>
      </div>
      {/* Navbar */}
      <Navbar
        theme={theme}
        onThemeToggle={handleThemeToggle}
        showAuthButtons={false}
      />
      <ChatMessages messages={messages} isLoading={isLoading} />
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}

export default Chatbot;
