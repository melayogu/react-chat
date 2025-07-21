import { useState } from 'react'
import type { CustomerFormData, FormComponentProps } from '../../types'
import { INDUSTRIES, COMPANY_SIZES } from '../../constants/formOptions'
import { validateEmail, validatePhone, generateCustomerSampleData, handleFormSubmit } from '../../utils/formUtils'

export const CustomerForm = ({ formData, setFormData, onClose }: FormComponentProps<CustomerFormData>) => {
  const [errors, setErrors] = useState<Partial<CustomerFormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<CustomerFormData> = {}
    
    if (!formData.companyName.trim()) newErrors.companyName = '公司名稱不能為空'
    if (!formData.contactPerson.trim()) newErrors.contactPerson = '聯絡人不能為空'
    if (!validateEmail(formData.email)) newErrors.email = '請輸入有效的電子郵件地址'
    if (!validatePhone(formData.phone)) newErrors.phone = '請輸入有效的電話號碼'
    if (!formData.industry) newErrors.industry = '請選擇行業類別'
    if (!formData.companySize) newErrors.companySize = '請選擇公司規模'
    if (!formData.requirements.trim()) newErrors.requirements = '需求描述不能為空'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      handleFormSubmit(formData, '客戶表單', () => {
        setFormData({
          companyName: '', contactPerson: '', email: '', phone: '',
          address: '', industry: '', companySize: '',
          requirements: '', budget: '', timeline: ''
        })
        onClose()
      })
    }
  }

  const handleInputChange = (field: keyof CustomerFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const generateSampleData = () => {
    setFormData(generateCustomerSampleData())
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">公司名稱 <span className="required">*</span></label>
          <input
            type="text"
            className={`form-input ${errors.companyName ? 'error' : ''}`}
            value={formData.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
            placeholder="請輸入公司名稱"
          />
          {errors.companyName && <span className="error-message">{errors.companyName}</span>}
        </div>
        
        <div className="form-group">
          <label className="form-label">聯絡人 <span className="required">*</span></label>
          <input
            type="text"
            className={`form-input ${errors.contactPerson ? 'error' : ''}`}
            value={formData.contactPerson}
            onChange={(e) => handleInputChange('contactPerson', e.target.value)}
            placeholder="請輸入聯絡人姓名"
          />
          {errors.contactPerson && <span className="error-message">{errors.contactPerson}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">電子郵件 <span className="required">*</span></label>
          <input
            type="email"
            className={`form-input ${errors.email ? 'error' : ''}`}
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="company@example.com"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        
        <div className="form-group">
          <label className="form-label">電話號碼 <span className="required">*</span></label>
          <input
            type="tel"
            className={`form-input ${errors.phone ? 'error' : ''}`}
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="02-1234-5678"
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>
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

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">行業類別 <span className="required">*</span></label>
          <select
            className={`form-input ${errors.industry ? 'error' : ''}`}
            value={formData.industry}
            onChange={(e) => handleInputChange('industry', e.target.value)}
          >
            {INDUSTRIES.map(industry => (
              <option key={industry.value} value={industry.value}>{industry.label}</option>
            ))}
          </select>
          {errors.industry && <span className="error-message">{errors.industry}</span>}
        </div>
        
        <div className="form-group">
          <label className="form-label">公司規模 <span className="required">*</span></label>
          <select
            className={`form-input ${errors.companySize ? 'error' : ''}`}
            value={formData.companySize}
            onChange={(e) => handleInputChange('companySize', e.target.value)}
          >
            {COMPANY_SIZES.map(size => (
              <option key={size.value} value={size.value}>{size.label}</option>
            ))}
          </select>
          {errors.companySize && <span className="error-message">{errors.companySize}</span>}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">需求描述 <span className="required">*</span></label>
        <textarea
          className={`form-textarea ${errors.requirements ? 'error' : ''}`}
          value={formData.requirements}
          onChange={(e) => handleInputChange('requirements', e.target.value)}
          placeholder="請詳細描述您的業務需求..."
          rows={4}
        />
        {errors.requirements && <span className="error-message">{errors.requirements}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">預算範圍</label>
          <input
            type="text"
            className="form-input"
            value={formData.budget}
            onChange={(e) => handleInputChange('budget', e.target.value)}
            placeholder="例：50萬-100萬"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">預期時程</label>
          <input
            type="text"
            className="form-input"
            value={formData.timeline}
            onChange={(e) => handleInputChange('timeline', e.target.value)}
            placeholder="例：3個月內"
          />
        </div>
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
