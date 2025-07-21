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

interface CustomerFormData {
  companyName: string
  industry: string
  companySize: string
  website: string
  contactPerson: string
  address: string
  requirements: string
}

interface ProjectFormData {
  projectName: string
  projectType: string
  startDate: string
  endDate: string
  budget: string
  description: string
  technologies: string[]
}

interface SupportFormData {
  ticketType: string
  urgency: string
  subject: string
  description: string
  attachments: string
  previousTicket: string
}

interface FeedbackFormData {
  rating: number
  experience: string
  recommendation: number
  improvements: string
  futureInterest: string[]
}

// 多表單模態框組件
const MultiFormModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState('contact')
  
  // 聯絡表單狀態
  const [contactFormData, setContactFormData] = useState<FormData>({
    name: '', email: '', phone: '', department: '', message: '', priority: 'normal', subscribe: false
  })
  
  // 客戶表單狀態
  const [customerFormData, setCustomerFormData] = useState<CustomerFormData>({
    companyName: '', industry: '', companySize: '', website: '', contactPerson: '', address: '', requirements: ''
  })
  
  // 專案表單狀態
  const [projectFormData, setProjectFormData] = useState<ProjectFormData>({
    projectName: '', projectType: '', startDate: '', endDate: '', budget: '', description: '', technologies: []
  })
  
  // 支援表單狀態
  const [supportFormData, setSupportFormData] = useState<SupportFormData>({
    ticketType: '', urgency: '', subject: '', description: '', attachments: '', previousTicket: ''
  })
  
  // 回饋表單狀態
  const [feedbackFormData, setFeedbackFormData] = useState<FeedbackFormData>({
    rating: 5, experience: '', recommendation: 10, improvements: '', futureInterest: []
  })

  const tabs = [
    { id: 'contact', label: '聯絡表單', icon: '📧' },
    { id: 'customer', label: '客戶資料', icon: '🏢' },
    { id: 'project', label: '專案申請', icon: '📋' },
    { id: 'support', label: '技術支援', icon: '🛠️' },
    { id: 'feedback', label: '意見回饋', icon: '⭐' },
    { id: 'survey', label: '問卷調查', icon: '📊' }
  ]

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="multi-form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">表單中心</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        
        {/* 標籤頁導航 */}
        <div className="tabs-navigation">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>
        
        {/* 表單內容 */}
        <div className="form-content">
          {activeTab === 'contact' && (
            <ContactForm 
              formData={contactFormData} 
              setFormData={setContactFormData}
              onClose={onClose}
            />
          )}
          {activeTab === 'customer' && (
            <CustomerForm 
              formData={customerFormData} 
              setFormData={setCustomerFormData}
              onClose={onClose}
            />
          )}
          {activeTab === 'project' && (
            <ProjectForm 
              formData={projectFormData} 
              setFormData={setProjectFormData}
              onClose={onClose}
            />
          )}
          {activeTab === 'support' && (
            <SupportForm 
              formData={supportFormData} 
              setFormData={setSupportFormData}
              onClose={onClose}
            />
          )}
          {activeTab === 'feedback' && (
            <FeedbackForm 
              formData={feedbackFormData} 
              setFormData={setFeedbackFormData}
              onClose={onClose}
            />
          )}
          {activeTab === 'survey' && (
            <SurveyForm onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  )
}

// 聯絡表單子組件
const ContactForm = ({ formData, setFormData, onClose }: { 
  formData: FormData; 
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onClose: () => void;
}) => {
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
    if (!formData.name.trim()) newErrors.name = '姓名為必填項目'
    if (!formData.email.trim()) newErrors.email = '電子郵件為必填項目'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = '請輸入有效的電子郵件格式'
    if (!formData.phone.trim()) newErrors.phone = '電話號碼為必填項目'
    if (!formData.department) newErrors.department = '請選擇部門'
    if (!formData.message.trim()) newErrors.message = '訊息內容為必填項目'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      alert('聯絡表單提交成功！')
      setFormData({ name: '', email: '', phone: '', department: '', message: '', priority: 'normal', subscribe: false })
      onClose()
    }
  }

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const generateSampleData = () => {
    setFormData({
      name: '王小明',
      email: 'wang.xiaoming@example.com',
      phone: '0912-345-678',
      department: 'tech',
      message: '您好，我想詢問關於新產品的技術支援問題。',
      priority: 'high',
      subscribe: true
    })
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">姓名 <span className="required">*</span></label>
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
          <label className="form-label">電子郵件 <span className="required">*</span></label>
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
          <label className="form-label">電話號碼 <span className="required">*</span></label>
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
          <label className="form-label">部門 <span className="required">*</span></label>
          <select
            className={`form-input ${errors.department ? 'error' : ''}`}
            value={formData.department}
            onChange={(e) => handleInputChange('department', e.target.value)}
          >
            {departments.map(dept => (
              <option key={dept.value} value={dept.value}>{dept.label}</option>
            ))}
          </select>
          {errors.department && <span className="error-message">{errors.department}</span>}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">優先級</label>
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
        <label className="form-label">訊息內容 <span className="required">*</span></label>
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
        <button type="button" className="btn btn-secondary" onClick={generateSampleData}>
          產生範例資料
        </button>
        <div className="form-actions-right">
          <button type="button" className="btn btn-cancel" onClick={onClose}>取消</button>
          <button type="submit" className="btn btn-primary">提交表單</button>
        </div>
      </div>
    </form>
  )
}

// 客戶表單子組件
const CustomerForm = ({ formData, setFormData, onClose }: {
  formData: CustomerFormData;
  setFormData: React.Dispatch<React.SetStateAction<CustomerFormData>>;
  onClose: () => void;
}) => {
  const industries = [
    { value: '', label: '請選擇行業' },
    { value: 'tech', label: '科技業' },
    { value: 'finance', label: '金融業' },
    { value: 'retail', label: '零售業' },
    { value: 'manufacturing', label: '製造業' },
    { value: 'healthcare', label: '醫療業' },
    { value: 'education', label: '教育業' },
    { value: 'other', label: '其他' }
  ]

  const companySizes = [
    { value: '', label: '請選擇公司規模' },
    { value: 'startup', label: '新創公司 (1-10人)' },
    { value: 'small', label: '小型企業 (11-50人)' },
    { value: 'medium', label: '中型企業 (51-200人)' },
    { value: 'large', label: '大型企業 (201-1000人)' },
    { value: 'enterprise', label: '企業集團 (1000人以上)' }
  ]

  const handleInputChange = (field: keyof CustomerFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const generateSampleData = () => {
    setFormData({
      companyName: '台灣科技股份有限公司',
      industry: 'tech',
      companySize: 'medium',
      website: 'https://www.example.com.tw',
      contactPerson: '李經理',
      address: '台北市信義區信義路五段7號',
      requirements: '我們需要一套完整的企業管理系統，包含人事、財務、專案管理等模組。'
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('客戶資料提交成功！')
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">公司名稱 <span className="required">*</span></label>
          <input
            type="text"
            className="form-input"
            value={formData.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
            placeholder="請輸入公司名稱"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">行業別</label>
          <select
            className="form-input"
            value={formData.industry}
            onChange={(e) => handleInputChange('industry', e.target.value)}
          >
            {industries.map(industry => (
              <option key={industry.value} value={industry.value}>{industry.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">公司規模</label>
          <select
            className="form-input"
            value={formData.companySize}
            onChange={(e) => handleInputChange('companySize', e.target.value)}
          >
            {companySizes.map(size => (
              <option key={size.value} value={size.value}>{size.label}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label">公司網站</label>
          <input
            type="url"
            className="form-input"
            value={formData.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            placeholder="https://www.example.com"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">聯絡人</label>
          <input
            type="text"
            className="form-input"
            value={formData.contactPerson}
            onChange={(e) => handleInputChange('contactPerson', e.target.value)}
            placeholder="請輸入聯絡人姓名"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">公司地址</label>
          <input
            type="text"
            className="form-input"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="請輸入公司地址"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">需求說明</label>
        <textarea
          className="form-textarea"
          value={formData.requirements}
          onChange={(e) => handleInputChange('requirements', e.target.value)}
          placeholder="請詳述您的需求..."
          rows={4}
        />
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={generateSampleData}>
          產生範例資料
        </button>
        <div className="form-actions-right">
          <button type="button" className="btn btn-cancel" onClick={onClose}>取消</button>
          <button type="submit" className="btn btn-primary">提交表單</button>
        </div>
      </div>
    </form>
  )
}

// 專案表單子組件  
const ProjectForm = ({ formData, setFormData, onClose }: {
  formData: ProjectFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProjectFormData>>;
  onClose: () => void;
}) => {
  const projectTypes = [
    { value: '', label: '請選擇專案類型' },
    { value: 'web', label: '網站開發' },
    { value: 'mobile', label: '行動應用' },
    { value: 'desktop', label: '桌面應用' },
    { value: 'system', label: '系統整合' },
    { value: 'ai', label: 'AI/機器學習' },
    { value: 'blockchain', label: '區塊鏈' }
  ]

  const techOptions = ['React', 'Vue', 'Angular', 'Node.js', 'Python', 'Java', 'C#', '.NET', 'PHP', 'Go']

  const handleInputChange = (field: keyof ProjectFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleTechChange = (tech: string) => {
    const newTechs = formData.technologies.includes(tech)
      ? formData.technologies.filter(t => t !== tech)
      : [...formData.technologies, tech]
    handleInputChange('technologies', newTechs)
  }

  const generateSampleData = () => {
    setFormData({
      projectName: '企業官網重新設計',
      projectType: 'web',
      startDate: '2024-02-01',
      endDate: '2024-05-01',
      budget: '500000',
      description: '重新設計公司官網，包含響應式設計、內容管理系統、SEO優化等功能。',
      technologies: ['React', 'Node.js', 'MongoDB']
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('專案申請提交成功！')
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">專案名稱 <span className="required">*</span></label>
          <input
            type="text"
            className="form-input"
            value={formData.projectName}
            onChange={(e) => handleInputChange('projectName', e.target.value)}
            placeholder="請輸入專案名稱"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">專案類型</label>
          <select
            className="form-input"
            value={formData.projectType}
            onChange={(e) => handleInputChange('projectType', e.target.value)}
          >
            {projectTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">開始日期</label>
          <input
            type="date"
            className="form-input"
            value={formData.startDate}
            onChange={(e) => handleInputChange('startDate', e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">預計結束日期</label>
          <input
            type="date"
            className="form-input"
            value={formData.endDate}
            onChange={(e) => handleInputChange('endDate', e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">預算範圍 (新台幣)</label>
        <input
          type="number"
          className="form-input"
          value={formData.budget}
          onChange={(e) => handleInputChange('budget', e.target.value)}
          placeholder="請輸入預算金額"
        />
      </div>

      <div className="form-group">
        <label className="form-label">技術需求</label>
        <div className="checkbox-group">
          {techOptions.map(tech => (
            <label key={tech} className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.technologies.includes(tech)}
                onChange={() => handleTechChange(tech)}
                className="checkbox-input"
              />
              <span className="checkbox-text">{tech}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">專案描述</label>
        <textarea
          className="form-textarea"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="請詳述專案需求和目標..."
          rows={4}
        />
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={generateSampleData}>
          產生範例資料
        </button>
        <div className="form-actions-right">
          <button type="button" className="btn btn-cancel" onClick={onClose}>取消</button>
          <button type="submit" className="btn btn-primary">提交申請</button>
        </div>
      </div>
    </form>
  )
}

// 技術支援表單子組件
const SupportForm = ({ formData, setFormData, onClose }: {
  formData: SupportFormData;
  setFormData: React.Dispatch<React.SetStateAction<SupportFormData>>;
  onClose: () => void;
}) => {
  const ticketTypes = [
    { value: '', label: '請選擇問題類型' },
    { value: 'bug', label: '程式錯誤' },
    { value: 'feature', label: '功能需求' },
    { value: 'install', label: '安裝問題' },
    { value: 'config', label: '設定問題' },
    { value: 'performance', label: '效能問題' },
    { value: 'other', label: '其他' }
  ]

  const urgencyLevels = [
    { value: 'low', label: '低 - 一般諮詢' },
    { value: 'normal', label: '中 - 功能異常' },
    { value: 'high', label: '高 - 影響操作' },
    { value: 'critical', label: '緊急 - 系統停止' }
  ]

  const handleInputChange = (field: keyof SupportFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const generateSampleData = () => {
    setFormData({
      ticketType: 'bug',
      urgency: 'high',
      subject: '登入功能異常',
      description: '使用者無法正常登入系統，輸入正確帳號密碼後頁面會出現錯誤訊息。錯誤發生時間約在今天上午10點開始。',
      attachments: '錯誤截圖.png',
      previousTicket: 'TK-2024-001'
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('技術支援申請提交成功！')
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">問題類型 <span className="required">*</span></label>
          <select
            className="form-input"
            value={formData.ticketType}
            onChange={(e) => handleInputChange('ticketType', e.target.value)}
          >
            {ticketTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label">緊急程度</label>
          <select
            className="form-input"
            value={formData.urgency}
            onChange={(e) => handleInputChange('urgency', e.target.value)}
          >
            {urgencyLevels.map(level => (
              <option key={level.value} value={level.value}>{level.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">問題標題 <span className="required">*</span></label>
        <input
          type="text"
          className="form-input"
          value={formData.subject}
          onChange={(e) => handleInputChange('subject', e.target.value)}
          placeholder="請簡述問題"
        />
      </div>

      <div className="form-group">
        <label className="form-label">詳細描述 <span className="required">*</span></label>
        <textarea
          className="form-textarea"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="請詳述問題發生的情況、錯誤訊息、重現步驟等..."
          rows={5}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">相關附件</label>
          <input
            type="text"
            className="form-input"
            value={formData.attachments}
            onChange={(e) => handleInputChange('attachments', e.target.value)}
            placeholder="檔案名稱或描述"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">相關工單號碼</label>
          <input
            type="text"
            className="form-input"
            value={formData.previousTicket}
            onChange={(e) => handleInputChange('previousTicket', e.target.value)}
            placeholder="如 TK-2024-001"
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={generateSampleData}>
          產生範例資料
        </button>
        <div className="form-actions-right">
          <button type="button" className="btn btn-cancel" onClick={onClose}>取消</button>
          <button type="submit" className="btn btn-primary">提交工單</button>
        </div>
      </div>
    </form>
  )
}

// 意見回饋表單子組件
const FeedbackForm = ({ formData, setFormData, onClose }: {
  formData: FeedbackFormData;
  setFormData: React.Dispatch<React.SetStateAction<FeedbackFormData>>;
  onClose: () => void;
}) => {
  const experiences = [
    { value: 'excellent', label: '非常滿意' },
    { value: 'good', label: '滿意' },
    { value: 'average', label: '普通' },
    { value: 'poor', label: '不滿意' },
    { value: 'terrible', label: '非常不滿意' }
  ]

  const interests = ['新功能通知', '產品更新', '技術文章', '活動資訊', '優惠資訊']

  const handleInputChange = (field: keyof FeedbackFormData, value: string | number | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleInterestChange = (interest: string) => {
    const newInterests = formData.futureInterest.includes(interest)
      ? formData.futureInterest.filter(i => i !== interest)
      : [...formData.futureInterest, interest]
    handleInputChange('futureInterest', newInterests)
  }

  const generateSampleData = () => {
    setFormData({
      rating: 4,
      experience: 'good',
      recommendation: 8,
      improvements: '希望能增加更多客製化功能，並且改善使用者介面的響應速度。',
      futureInterest: ['新功能通知', '技術文章']
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('意見回饋提交成功！感謝您的寶貴意見。')
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label className="form-label">整體評分 (1-5分)</label>
        <div className="rating-group">
          {[1, 2, 3, 4, 5].map(score => (
            <label key={score} className="rating-label">
              <input
                type="radio"
                name="rating"
                value={score}
                checked={formData.rating === score}
                onChange={(e) => handleInputChange('rating', parseInt(e.target.value))}
                className="rating-input"
              />
              <span className="rating-star">⭐</span>
              <span className="rating-text">{score}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">使用體驗</label>
        <div className="radio-group">
          {experiences.map(exp => (
            <label key={exp.value} className="radio-label">
              <input
                type="radio"
                name="experience"
                value={exp.value}
                checked={formData.experience === exp.value}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                className="radio-input"
              />
              <span className="radio-text">{exp.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">推薦指數 (0-10分，10分為最高)</label>
        <input
          type="range"
          min="0"
          max="10"
          value={formData.recommendation}
          onChange={(e) => handleInputChange('recommendation', parseInt(e.target.value))}
          className="range-input"
        />
        <div className="range-display">目前分數: {formData.recommendation}</div>
      </div>

      <div className="form-group">
        <label className="form-label">改善建議</label>
        <textarea
          className="form-textarea"
          value={formData.improvements}
          onChange={(e) => handleInputChange('improvements', e.target.value)}
          placeholder="請提供您的改善建議..."
          rows={4}
        />
      </div>

      <div className="form-group">
        <label className="form-label">未來興趣 (可複選)</label>
        <div className="checkbox-group">
          {interests.map(interest => (
            <label key={interest} className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.futureInterest.includes(interest)}
                onChange={() => handleInterestChange(interest)}
                className="checkbox-input"
              />
              <span className="checkbox-text">{interest}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={generateSampleData}>
          產生範例資料
        </button>
        <div className="form-actions-right">
          <button type="button" className="btn btn-cancel" onClick={onClose}>取消</button>
          <button type="submit" className="btn btn-primary">提交回饋</button>
        </div>
      </div>
    </form>
  )
}

// 問卷調查表單子組件
const SurveyForm = ({ onClose }: { onClose: () => void }) => {
  const [answers, setAnswers] = useState<Record<string, string | number | string[]>>({})

  const questions = [
    {
      id: 'age',
      type: 'select',
      question: '您的年齡範圍？',
      options: ['18-25', '26-35', '36-45', '46-55', '55歲以上']
    },
    {
      id: 'usage_frequency',
      type: 'radio',
      question: '您使用我們產品的頻率？',
      options: ['每天', '每週幾次', '每月幾次', '很少使用']
    },
    {
      id: 'features',
      type: 'checkbox',
      question: '您最常使用哪些功能？ (可複選)',
      options: ['聊天功能', '檔案分享', '視訊通話', '螢幕分享', '群組管理']
    },
    {
      id: 'satisfaction',
      type: 'range',
      question: '對產品的滿意度 (1-10分)',
      min: 1,
      max: 10
    },
    {
      id: 'suggestions',
      type: 'textarea',
      question: '其他建議或意見'
    }
  ]

  const handleAnswerChange = (questionId: string, value: string | number | string[]) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const handleCheckboxChange = (questionId: string, option: string) => {
    const currentAnswers = (answers[questionId] as string[]) || []
    const newAnswers = currentAnswers.includes(option)
      ? currentAnswers.filter((item: string) => item !== option)
      : [...currentAnswers, option]
    handleAnswerChange(questionId, newAnswers)
  }

  const generateSampleData = () => {
    setAnswers({
      age: '26-35',
      usage_frequency: '每天',
      features: ['聊天功能', '檔案分享'],
      satisfaction: 8,
      suggestions: '希望能增加更多自訂主題選項'
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('問卷調查提交成功！感謝您的參與。')
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {questions.map(question => (
        <div key={question.id} className="form-group">
          <label className="form-label">{question.question}</label>
          
          {question.type === 'select' && (
            <select
              className="form-input"
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            >
              <option value="">請選擇...</option>
              {question.options?.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          )}
          
          {question.type === 'radio' && (
            <div className="radio-group">
              {question.options?.map(option => (
                <label key={option} className="radio-label">
                  <input
                    type="radio"
                    name={question.id}
                    value={option}
                    checked={answers[question.id] === option}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    className="radio-input"
                  />
                  <span className="radio-text">{option}</span>
                </label>
              ))}
            </div>
          )}
          
          {question.type === 'checkbox' && (
            <div className="checkbox-group">
              {question.options?.map(option => (
                <label key={option} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={((answers[question.id] as string[]) || []).includes(option)}
                    onChange={() => handleCheckboxChange(question.id, option)}
                    className="checkbox-input"
                  />
                  <span className="checkbox-text">{option}</span>
                </label>
              ))}
            </div>
          )}
          
          {question.type === 'range' && (
            <>
              <input
                type="range"
                min={question.min}
                max={question.max}
                value={answers[question.id] || question.min}
                onChange={(e) => handleAnswerChange(question.id, parseInt(e.target.value))}
                className="range-input"
              />
              <div className="range-display">目前分數: {answers[question.id] || question.min}</div>
            </>
          )}
          
          {question.type === 'textarea' && (
            <textarea
              className="form-textarea"
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              placeholder="請輸入您的意見..."
              rows={3}
            />
          )}
        </div>
      ))}

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={generateSampleData}>
          產生範例資料
        </button>
        <div className="form-actions-right">
          <button type="button" className="btn btn-cancel" onClick={onClose}>取消</button>
          <button type="submit" className="btn btn-primary">提交問卷</button>
        </div>
      </div>
    </form>
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
      <MultiFormModal isOpen={showForm} onClose={() => setShowForm(false)} />
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
