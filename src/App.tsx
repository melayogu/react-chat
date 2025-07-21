import { useState, useRef, useEffect } from 'react'
import './App.css'
import { useChatService } from './hooks/useChatService'

interface ChatRoom {
  id: string
  name: string
  onlineCount: number
}

interface TopMenuProps {
  onClearChat: () => void
  messageCount: number
  currentRoom: string
}

// 頂部選單組件
const TopMenu = ({ onClearChat, messageCount, currentRoom }: TopMenuProps) => {
  const [showSettings, setShowSettings] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [notifications, setNotifications] = useState(true)
  
  const toggleNotifications = () => {
    setNotifications(!notifications)
    // 這裡可以添加實際的通知設定邏輯
  }
  
  const handleSearch = () => {
    setShowSearch(!showSearch)
    // 這裡可以添加搜尋功能
  }
  
  return (
    <div className="top-menu">
      <div className="top-menu-left">
        <div className="app-logo">
          <span className="logo-icon">💬</span>
          <span className="app-title">React Chat</span>
        </div>
        <div className="breadcrumb">
          <span className="breadcrumb-item">聊天室</span>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-item current">{currentRoom}</span>
        </div>
      </div>
      
      <div className="top-menu-right">
        <div className="menu-stats">
          <span className="message-count">訊息: {messageCount}</span>
        </div>
        
        <div className="user-status">
          <div className="user-avatar">
            <span className="avatar-text">我</span>
            <div className="status-dot online"></div>
          </div>
        </div>
        
        <div className="menu-actions">
          <button 
            className={`menu-btn ${showSearch ? 'active' : ''}`} 
            title="搜尋訊息"
            onClick={handleSearch}
          >
            <span className="btn-icon">🔍</span>
          </button>
          
          <button 
            className={`menu-btn ${notifications ? 'active' : ''}`} 
            title="通知設定"
            onClick={toggleNotifications}
          >
            <span className="btn-icon">{notifications ? '🔔' : '🔕'}</span>
          </button>
          
          <button className="menu-btn" title="清除聊天記錄" onClick={onClearChat}>
            <span className="btn-icon">🗑️</span>
          </button>
          
          <div className="menu-dropdown">
            <button 
              className="menu-btn" 
              title="設定"
              onClick={() => setShowSettings(!showSettings)}
            >
              <span className="btn-icon">⚙️</span>
            </button>
            
            {showSettings && (
              <div className="dropdown-content">
                <button className="dropdown-item">個人資料</button>
                <button className="dropdown-item">主題設定</button>
                <button className="dropdown-item">語言設定</button>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item">登出</button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* 搜尋欄 */}
      {showSearch && (
        <div className="search-overlay">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="搜尋訊息..." 
              className="search-input"
              autoFocus
            />
            <button className="search-close" onClick={() => setShowSearch(false)}>
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function App() {
  const [currentRoom, setCurrentRoom] = useState<string>('general')
  const [messageText, setMessageText] = useState('')
  const { messages, sendMessage, clearMessages, getMessageCount } = useChatService()
  
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
  }, [messages])

  const handleSendMessage = async () => {
    if (!messageText.trim()) return

    await sendMessage(messageText, '用戶')
    setMessageText('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleClearChat = () => {
    if (window.confirm('確定要清除所有聊天記錄嗎？')) {
      clearMessages()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-TW', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const currentRoomData = rooms.find(room => room.id === currentRoom)

  return (
    <div className="app-wrapper">
      {/* 頂部選單 */}
      <TopMenu 
        onClearChat={handleClearChat}
        messageCount={getMessageCount()}
        currentRoom={currentRoomData?.name || currentRoom}
      />
      
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
          {messages.length === 0 ? (
            <div className="welcome-message">
              <div className="welcome-icon">💬</div>
              <p>還沒有任何訊息，開始聊天吧！</p>
            </div>
          ) : (
            messages.map(message => (
              <div key={message.id} className={`message ${message.isOwn ? 'own' : ''}`}>
                <div className="message-avatar">
                  {message.isOwn ? '我' : message.sender.charAt(0)}
                </div>
                <div className="message-content">
                  <div className="message-info">
                    <span className="message-author">
                      {message.isOwn ? '我' : message.sender}
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
            onClick={handleSendMessage}
            disabled={!messageText.trim()}
          >
            發送
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default App
