import { useState } from 'react'
import '../styles/chatbot.css'
import ChatHeader from '../components/ChatHeader'
import ChatMessages from '../components/ChatMessages'
import ChatInput from '../components/ChatInput'

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! How can I help you?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async (text) => {
    if (!text.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: text,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages([...messages, userMessage])
    setIsLoading(true)

    // Simulate API call to backend
    try {
      // TODO: Replace with actual API endpoint
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text })
      })

      if (response.ok) {
        const data = await response.json()
        const botMessage = {
          id: messages.length + 2,
          text: data.reply || "I didn't understand that. Could you please rephrase?",
          sender: 'bot',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botMessage])
      }
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage = {
        id: messages.length + 2,
        text: "Sorry, I encountered an error. Please try again.",
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="chatbot-container">
      <ChatHeader />
      <ChatMessages messages={messages} isLoading={isLoading} />
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  )
}

export default Chatbot
