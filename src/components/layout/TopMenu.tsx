import type { TopMenuProps } from '../../types'

export const TopMenu = ({ onSearchClick, onFormClick, onNotificationClick }: TopMenuProps) => {
  return (
    <header className="top-menu">
      <div className="top-menu-left">
        <div className="logo">
          <span className="logo-icon">💬</span>
          <h1 className="logo-text">React Chat</h1>
        </div>
      </div>
      
      <nav className="top-menu-center">
        <ul className="nav-links">
          <li><a href="#home" className="nav-link">首頁</a></li>
          <li><a href="#features" className="nav-link">功能</a></li>
          <li><a href="#about" className="nav-link">關於</a></li>
          <li><a href="#contact" className="nav-link">聯絡</a></li>
        </ul>
      </nav>
      
      <div className="top-menu-right">
        <button 
          className="menu-btn search-btn" 
          onClick={onSearchClick}
          title="搜尋"
        >
          <span className="btn-icon">🔍</span>
          <span className="btn-text">搜尋</span>
        </button>
        
        <button 
          className="menu-btn form-btn" 
          onClick={onFormClick}
          title="表單"
        >
          <span className="btn-icon">📝</span>
          <span className="btn-text">表單</span>
        </button>
        
        <button 
          className="menu-btn notification-btn" 
          onClick={onNotificationClick}
          title="通知"
        >
          <span className="btn-icon">🔔</span>
          <span className="btn-text">通知</span>
          <span className="notification-badge">3</span>
        </button>
      </div>
    </header>
  )
}
