import { useState } from 'react'
import type { FormData, FormComponentProps } from '../../types'
import { DEPARTMENTS, PRIORITIES } from '../../constants/formOptions'
import { validateContactForm, generateContactSampleData, handleFormSubmit } from '../../utils/formUtils'

export const ContactForm = ({ formData, setFormData, onClose }: FormComponentProps<FormData>) => {
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const validateForm = (): boolean => {
    const newErrors = validateContactForm(formData)
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      handleFormSubmit(formData, '聯絡表單', () => {
        setFormData({ 
          name: '', email: '', phone: '', department: '', 
          message: '', priority: 'normal', subscribe: false 
        })
        onClose()
      })
    }
  }

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const generateSampleData = () => {
    setFormData(generateContactSampleData())
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
            {DEPARTMENTS.map(dept => (
              <option key={dept.value} value={dept.value}>{dept.label}</option>
            ))}
          </select>
          {errors.department && <span className="error-message">{errors.department}</span>}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">優先級</label>
        <div className="radio-group">
          {PRIORITIES.map(priority => (
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
