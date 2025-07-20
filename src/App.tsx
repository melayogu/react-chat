import { useState, useRef, useEffect } from 'react'
import './App.css'

interface Message {
  id: string
  author: string
  text: string
  timestamp: Date
  isOwn: boolean
}

interface ChatRoom {
  id: string
  name: string
  onlineCount: number
}

function App() {
  const [currentRoom, setCurrentRoom] = useState<string>('general')
  const [messageText, setMessageText] = useState('')
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    general: [
      {
        id: '1',
        author: '系統',
        text: '歡迎來到聊天室！',
        timestamp: new Date(Date.now() - 60000),
        isOwn: false
      }
    ],
    技術討論: [],
    隨意聊天: []
  })
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const rooms: ChatRoom[] = [
    { id: 'general', name: '聊天室', onlineCount: 3 },
    { id: '技術討論', name: '技術討論', onlineCount: 5 },
    { id: '隨意聊天', name: '隨意聊天', onlineCount: 2 }
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, currentRoom])

  const sendMessage = () => {
    if (!messageText.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      author: '系統',
      text: messageText,
      timestamp: new Date(),
      isOwn: true
    }

    setMessages(prev => ({
      ...prev,
      [currentRoom]: [...(prev[currentRoom] || []), newMessage]
    }))

    setMessageText('')
    
    // 模擬回覆
    setTimeout(() => {
      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        author: '系統',
        text: '收到您的訊息！',
        timestamp: new Date(),
        isOwn: false
      }
      
      setMessages(prev => ({
        ...prev,
        [currentRoom]: [...(prev[currentRoom] || []), replyMessage]
      }))
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-TW', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const currentRoomData = rooms.find(room => room.id === currentRoom)
  const currentMessages = messages[currentRoom] || []

  return (
    <div className="chat-container">
      {/* 側邊欄 */}
      <div className="chat-sidebar">
        <div className="chat-header">
          <h1 className="chat-title">聊天室</h1>
        </div>
        <div className="room-list">
          {rooms.map(room => (
            <button
              key={room.id}
              className={`room-item ${room.id === currentRoom ? 'active' : ''}`}
              onClick={() => setCurrentRoom(room.id)}
            >
              <span className="room-name">{room.name}</span>
              <div className="online-indicator"></div>
            </button>
          ))}
        </div>
      </div>

      {/* 主聊天區域 */}
      <div className="chat-main">
        {/* 房間標題 */}
        <div className="current-room-header">
          <h2 className="current-room-name">{currentRoomData?.name}</h2>
          <span className="online-count">線上 {currentRoomData?.onlineCount} 人</span>
        </div>

        {/* 訊息區域 */}
        <div className="messages-container">
          {currentMessages.length === 0 ? (
            <div className="welcome-message">
              <div className="welcome-icon">💬</div>
              <p>還沒有任何訊息，開始聊天吧！</p>
            </div>
          ) : (
            currentMessages.map(message => (
              <div key={message.id} className={`message ${message.isOwn ? 'own' : ''}`}>
                <div className="message-avatar">
                  {message.isOwn ? '我' : message.author.charAt(0)}
                </div>
                <div className="message-content">
                  <div className="message-info">
                    <span className="message-author">
                      {message.isOwn ? '我' : message.author}
                    </span>
                    <span className="message-time">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  <div className="message-text">
                    {message.text}
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* 輸入區域 */}
        <div className="input-container">
          <textarea
            ref={inputRef}
            className="message-input"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="輸入訊息..."
            rows={1}
          />
          <button
            className="send-button"
            onClick={sendMessage}
            disabled={!messageText.trim()}
          >
            發送
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
