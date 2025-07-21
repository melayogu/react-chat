import { useState, useRef, useEffect } from 'react'
import './App.css'
import './styles/modal.css'
import { useChatService } from './hooks/useChatService'
import { TopMenu, MultiFormModal } from './components'

interface ChatRoom {
  id: string
  name: string
  onlineCount: number
}

function App() {
  const [currentRoom, setCurrentRoom] = useState<string>('general')
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [showSearch, setShowSearch] = useState<boolean>(false)
  const [showNotifications, setShowNotifications] = useState<boolean>(false)
  const [inputMessage, setInputMessage] = useState<string>('')
  
  const { messages, sendMessage, clearMessages } = useChatService()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      sendMessage(inputMessage, currentRoom)
      setInputMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const rooms: ChatRoom[] = [
    { id: 'general', name: '一般討論', onlineCount: 23 },
    { id: 'tech', name: '技術交流', onlineCount: 15 },
    { id: 'project', name: '專案協作', onlineCount: 8 },
    { id: 'random', name: '隨意聊天', onlineCount: 31 }
  ]

  const filteredMessages = messages.filter(message =>
    !searchQuery || 
    message.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.sender.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const notifications = [
    { id: 1, message: '系統維護通知：今晚 23:00-24:00', time: '10分鐘前', type: 'info' },
    { id: 2, message: '新功能上線：表單整合功能', time: '1小時前', type: 'feature' },
    { id: 3, message: '張小明 邀請您加入專案群組', time: '2小時前', type: 'invite' }
  ]

  // 頂部選單處理函數
  const handleSearchClick = () => {
    setShowSearch(!showSearch)
    setShowNotifications(false)
  }

  const handleFormClick = () => {
    setIsFormModalOpen(true)
    setShowSearch(false)
    setShowNotifications(false)
  }

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications)
    setShowSearch(false)
  }

  const closeFormModal = () => {
    setIsFormModalOpen(false)
  }

  return (
    <div className="app">
      <TopMenu 
        onSearchClick={handleSearchClick}
        onFormClick={handleFormClick}
        onNotificationClick={handleNotificationClick}
      />

      {/* 搜尋面板 */}
      {showSearch && (
        <div className="search-panel">
          <div className="search-container">
            <input
              type="text"
              placeholder="搜尋訊息或用戶..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              autoFocus
            />
            <button 
              className="search-clear"
              onClick={() => setSearchQuery('')}
            >
              清除
            </button>
          </div>
        </div>
      )}

      {/* 通知面板 */}
      {showNotifications && (
        <div className="notifications-panel">
          <div className="notifications-header">
            <h3>通知中心</h3>
            <button className="mark-all-read">全部標記為已讀</button>
          </div>
          <div className="notifications-list">
            {notifications.map(notification => (
              <div key={notification.id} className={`notification-item ${notification.type}`}>
                <div className="notification-content">
                  <p className="notification-message">{notification.message}</p>
                  <span className="notification-time">{notification.time}</span>
                </div>
                <button className="notification-dismiss">×</button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="main-content">
        {/* 側邊欄 */}
        <aside className="sidebar">
          <div className="room-selector">
            <h3>聊天室</h3>
            <div className="room-list">
              {rooms.map(room => (
                <div
                  key={room.id}
                  className={`room-item ${currentRoom === room.id ? 'active' : ''}`}
                  onClick={() => setCurrentRoom(room.id)}
                >
                  <span className="room-name">{room.name}</span>
                  <span className="online-count">{room.onlineCount}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="chat-controls">
            <button 
              className="clear-btn"
              onClick={clearMessages}
            >
              清除訊息
            </button>
            <div className="message-stats">
              <span>訊息總數: {messages.length}</span>
              <span>當前房間: {rooms.find(r => r.id === currentRoom)?.name}</span>
            </div>
          </div>
        </aside>

        {/* 主聊天區域 */}
        <main className="chat-area">
          <div className="chat-header">
            <h2>{rooms.find(r => r.id === currentRoom)?.name || '聊天室'}</h2>
            <div className="chat-info">
              <span>在線: {rooms.find(r => r.id === currentRoom)?.onlineCount || 0} 人</span>
              {searchQuery && <span>搜尋: "{searchQuery}"</span>}
            </div>
          </div>

          <div className="messages-container">
            {filteredMessages.length === 0 ? (
              <div className="no-messages">
                {searchQuery ? '沒有找到符合的訊息' : '還沒有訊息，開始聊天吧！'}
              </div>
            ) : (
              filteredMessages.map((message) => (
                <div key={message.id} className="message">
                  <div className="message-header">
                    <span className="username">{message.sender}</span>
                    <span className="timestamp">{message.timestamp.toLocaleTimeString()}</span>
                  </div>
                  <div className="message-content">{message.text}</div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="input-area">
            <div className="input-container">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="輸入訊息..."
                className="message-input"
                rows={1}
              />
              <button 
                onClick={handleSendMessage}
                className="send-button"
                disabled={!inputMessage.trim()}
              >
                發送
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* 多功能表單模態框 */}
      <MultiFormModal 
        isOpen={isFormModalOpen}
        onClose={closeFormModal}
      />
    </div>
  )
}

export default App
