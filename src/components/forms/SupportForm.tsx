import { useState } from 'react'
import type { SupportFormData, FormComponentProps } from '../../types'
import { TICKET_TYPES, URGENCY_LEVELS, TECH_OPTIONS } from '../../constants/formOptions'
import { validateEmail, handleFormSubmit } from '../../utils/formUtils'

export const SupportForm = ({ formData, setFormData, onClose }: FormComponentProps<SupportFormData>) => {
  const [errors, setErrors] = useState<Partial<SupportFormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<SupportFormData> = {}
    
    if (!formData.customerName.trim()) newErrors.customerName = '客戶姓名不能為空'
    if (!validateEmail(formData.email)) newErrors.email = '請輸入有效的電子郵件地址'
    if (!formData.ticketType) newErrors.ticketType = '請選擇問題類型'
    if (!formData.subject.trim()) newErrors.subject = '問題主旨不能為空'
    if (!formData.description.trim()) newErrors.description = '問題描述不能為空'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      handleFormSubmit(formData, '技術支援表單', () => {
        setFormData({
          customerName: '', email: '', phone: '', company: '',
          ticketType: '', subject: '', description: '',
          urgency: 'normal', affectedUsers: '', environment: '',
          reproductionSteps: '', expectedBehavior: '', actualBehavior: '',
          attachments: [], relatedSystems: []
        })
        onClose()
      })
    }
  }

  const handleInputChange = (field: keyof SupportFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSystemChange = (system: string) => {
    const updatedSystems = formData.relatedSystems.includes(system)
      ? formData.relatedSystems.filter(s => s !== system)
      : [...formData.relatedSystems, system]
    handleInputChange('relatedSystems', updatedSystems)
  }

  const generateSampleData = () => {
    setFormData({
      customerName: '陳客戶',
      email: 'customer.chen@company.com',
      phone: '0987-654-321',
      company: '創新科技有限公司',
      ticketType: 'bug',
      subject: '登入系統時出現錯誤訊息',
      description: '每次嘗試登入時都會出現"連線逾時"的錯誤訊息，無法正常進入系統。',
      urgency: 'high',
      affectedUsers: '10',
      environment: 'Windows 10, Chrome 瀏覽器',
      reproductionSteps: '1. 開啟登入頁面\n2. 輸入帳號密碼\n3. 點擊登入按鈕\n4. 出現錯誤訊息',
      expectedBehavior: '應該能夠正常登入系統',
      actualBehavior: '出現連線逾時錯誤，無法登入',
      attachments: [],
      relatedSystems: ['React', 'Node.js']
    })
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">客戶姓名 <span className="required">*</span></label>
          <input
            type="text"
            className={`form-input ${errors.customerName ? 'error' : ''}`}
            value={formData.customerName}
            onChange={(e) => handleInputChange('customerName', e.target.value)}
            placeholder="請輸入客戶姓名"
          />
          {errors.customerName && <span className="error-message">{errors.customerName}</span>}
        </div>
        
        <div className="form-group">
          <label className="form-label">電子郵件 <span className="required">*</span></label>
          <input
            type="email"
            className={`form-input ${errors.email ? 'error' : ''}`}
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="customer@company.com"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">聯絡電話</label>
          <input
            type="tel"
            className="form-input"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="0912-345-678"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">公司名稱</label>
          <input
            type="text"
            className="form-input"
            value={formData.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
            placeholder="請輸入公司名稱"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">問題類型 <span className="required">*</span></label>
          <select
            className={`form-input ${errors.ticketType ? 'error' : ''}`}
            value={formData.ticketType}
            onChange={(e) => handleInputChange('ticketType', e.target.value)}
          >
            {TICKET_TYPES.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
          {errors.ticketType && <span className="error-message">{errors.ticketType}</span>}
        </div>
        
        <div className="form-group">
          <label className="form-label">緊急程度</label>
          <select
            className="form-input"
            value={formData.urgency}
            onChange={(e) => handleInputChange('urgency', e.target.value)}
          >
            {URGENCY_LEVELS.map(level => (
              <option key={level.value} value={level.value}>{level.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">問題主旨 <span className="required">*</span></label>
        <input
          type="text"
          className={`form-input ${errors.subject ? 'error' : ''}`}
          value={formData.subject}
          onChange={(e) => handleInputChange('subject', e.target.value)}
          placeholder="請簡述問題"
        />
        {errors.subject && <span className="error-message">{errors.subject}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">問題描述 <span className="required">*</span></label>
        <textarea
          className={`form-textarea ${errors.description ? 'error' : ''}`}
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="請詳細描述遇到的問題..."
          rows={4}
        />
        {errors.description && <span className="error-message">{errors.description}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">受影響用戶數</label>
          <input
            type="number"
            className="form-input"
            value={formData.affectedUsers}
            onChange={(e) => handleInputChange('affectedUsers', e.target.value)}
            placeholder="受影響的用戶數量"
            min="0"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">系統環境</label>
          <input
            type="text"
            className="form-input"
            value={formData.environment}
            onChange={(e) => handleInputChange('environment', e.target.value)}
            placeholder="作業系統、瀏覽器版本等"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">重現步驟</label>
        <textarea
          className="form-textarea"
          value={formData.reproductionSteps}
          onChange={(e) => handleInputChange('reproductionSteps', e.target.value)}
          placeholder="請提供重現問題的詳細步驟..."
          rows={3}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">預期行為</label>
          <textarea
            className="form-textarea"
            value={formData.expectedBehavior}
            onChange={(e) => handleInputChange('expectedBehavior', e.target.value)}
            placeholder="描述您期望的正常行為"
            rows={2}
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">實際行為</label>
          <textarea
            className="form-textarea"
            value={formData.actualBehavior}
            onChange={(e) => handleInputChange('actualBehavior', e.target.value)}
            placeholder="描述實際發生的行為"
            rows={2}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">相關系統</label>
        <div className="checkbox-grid">
          {TECH_OPTIONS.map(tech => (
            <label key={tech} className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.relatedSystems.includes(tech)}
                onChange={() => handleSystemChange(tech)}
                className="checkbox-input"
              />
              <span className="checkbox-text">{tech}</span>
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
          <button type="submit" className="btn btn-primary">提交工單</button>
        </div>
      </div>
    </form>
  )
}
