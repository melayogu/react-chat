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

interface FormData {
  name: string
  email: string
  phone: string
  department: string
  message: string
  priority: string
  subscribe: boolean
}

// 表單模態框組件
const FormModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    department: '',
    message: '',
    priority: 'normal',
    subscribe: false
  })

  const [errors, setErrors] = useState<Partial<FormData>>({})

  const departments = [
    { value: '', label: '請選擇部門' },
    { value: 'tech', label: '技術部' },
    { value: 'sales', label: '業務部' },
    { value: 'support', label: '客服部' },
    { value: 'hr', label: '人力資源部' },
    { value: 'finance', label: '財務部' }
  ]

  const priorities = [
    { value: 'low', label: '低' },
    { value: 'normal', label: '普通' },
    { value: 'high', label: '高' },
    { value: 'urgent', label: '緊急' }
  ]

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = '姓名為必填項目'
    }

    if (!formData.email.trim()) {
      newErrors.email = '電子郵件為必填項目'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '請輸入有效的電子郵件格式'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = '電話號碼為必填項目'
    } else if (!/^[\d\-()+ ]+$/.test(formData.phone)) {
      newErrors.phone = '請輸入有效的電話號碼'
    }

    if (!formData.department) {
      newErrors.department = '請選擇部門'
    }

    if (!formData.message.trim()) {
      newErrors.message = '訊息內容為必填項目'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      // 模擬提交
      console.log('表單提交成功:', formData)
      alert('表單提交成功！')
      
      // 重置表單
      setFormData({
        name: '',
        email: '',
        phone: '',
        department: '',
        message: '',
        priority: 'normal',
        subscribe: false
      })
      setErrors({})
      onClose()
    }
  }

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // 清除該欄位的錯誤
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }

  const generateSampleData = () => {
    setFormData({
      name: '王小明',
      email: 'wang.xiaoming@example.com',
      phone: '0912-345-678',
      department: 'tech',
      message: '您好，我想詢問關於新產品的技術支援問題。我們公司正在評估貴公司的解決方案，希望能夠安排一次詳細的技術討論會議。',
      priority: 'high',
      subscribe: true
    })
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">聯絡表單</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                姓名 <span className="required">*</span>
              </label>
              <input
                type="text"
                className={`form-input ${errors.name ? 'error' : ''}`}
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="請輸入您的姓名"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
            
            <div className="form-group">
              <label className="form-label">
                電子郵件 <span className="required">*</span>
              </label>
              <input
                type="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your.email@example.com"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                電話號碼 <span className="required">*</span>
              </label>
              <input
                type="tel"
                className={`form-input ${errors.phone ? 'error' : ''}`}
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="0912-345-678"
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
            
            <div className="form-group">
              <label className="form-label">
                部門 <span className="required">*</span>
              </label>
              <select
                className={`form-input ${errors.department ? 'error' : ''}`}
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
              >
                {departments.map(dept => (
                  <option key={dept.value} value={dept.value}>
                    {dept.label}
                  </option>
                ))}
              </select>
              {errors.department && <span className="error-message">{errors.department}</span>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              優先級
            </label>
            <div className="radio-group">
              {priorities.map(priority => (
                <label key={priority.value} className="radio-label">
                  <input
                    type="radio"
                    name="priority"
                    value={priority.value}
                    checked={formData.priority === priority.value}
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                    className="radio-input"
                  />
                  <span className="radio-text">{priority.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              訊息內容 <span className="required">*</span>
            </label>
            <textarea
              className={`form-textarea ${errors.message ? 'error' : ''}`}
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="請描述您的需求或問題..."
              rows={4}
            />
            {errors.message && <span className="error-message">{errors.message}</span>}
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.subscribe}
                onChange={(e) => handleInputChange('subscribe', e.target.checked)}
                className="checkbox-input"
              />
              <span className="checkbox-text">訂閱最新消息和產品更新</span>
            </label>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={generateSampleData}
            >
              產生範例資料
            </button>
            <div className="form-actions-right">
              <button
                type="button"
                className="btn btn-cancel"
                onClick={onClose}
              >
                取消
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                提交表單
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

// 頂部選單組件
const TopMenu = ({ onClearChat, messageCount, currentRoom }: TopMenuProps) => {
  const [showSettings, setShowSettings] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showForm, setShowForm] = useState(false)
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
            className="menu-btn" 
            title="表單整合"
            onClick={() => setShowForm(true)}
          >
            <span className="btn-icon">📝</span>
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
      
      {/* 表單模態框 */}
      <FormModal isOpen={showForm} onClose={() => setShowForm(false)} />
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
