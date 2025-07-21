import { useState } from 'react'
import type { FeedbackFormData, FormComponentProps } from '../../types'
import { EXPERIENCES, INTERESTS } from '../../constants/formOptions'
import { validateEmail, handleFormSubmit } from '../../utils/formUtils'

export const FeedbackForm = ({ formData, setFormData, onClose }: FormComponentProps<FeedbackFormData>) => {
  const [errors, setErrors] = useState<Partial<FeedbackFormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<FeedbackFormData> = {}
    
    if (!formData.userName.trim()) newErrors.userName = '姓名不能為空'
    if (!validateEmail(formData.email)) newErrors.email = '請輸入有效的電子郵件地址'
    if (!formData.experience) newErrors.experience = '請選擇使用體驗'
    if (!formData.feedback.trim()) newErrors.feedback = '意見回饋不能為空'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      handleFormSubmit(formData, '意見回饋表單', () => {
        setFormData({
          userName: '', email: '', userType: '', experience: '',
          usageFrequency: '', favoriteFeatures: [], improvements: '',
          rating: 5, feedback: '', wouldRecommend: false,
          interests: [], additionalComments: ''
        })
        onClose()
      })
    }
  }

  const handleInputChange = (field: keyof FeedbackFormData, value: string | number | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleFeatureChange = (feature: string) => {
    const updatedFeatures = formData.favoriteFeatures.includes(feature)
      ? formData.favoriteFeatures.filter(f => f !== feature)
      : [...formData.favoriteFeatures, feature]
    handleInputChange('favoriteFeatures', updatedFeatures)
  }

  const handleInterestChange = (interest: string) => {
    const updatedInterests = formData.interests.includes(interest)
      ? formData.interests.filter(i => i !== interest)
      : [...formData.interests, interest]
    handleInputChange('interests', updatedInterests)
  }

  const generateSampleData = () => {
    setFormData({
      userName: '林用戶',
      email: 'user.lin@example.com',
      userType: 'business',
      experience: 'good',
      usageFrequency: '每天',
      favoriteFeatures: ['聊天功能', '檔案分享'],
      improvements: '希望能增加更多表情符號和自定義主題功能。',
      rating: 8,
      feedback: '整體使用體驗良好，介面簡潔易用，希望能持續優化功能。',
      wouldRecommend: true,
      interests: ['新功能通知', '產品更新'],
      additionalComments: '感謝團隊的努力，期待更多創新功能！'
    })
  }

  const features = ['聊天功能', '檔案分享', '視訊通話', '螢幕分享', '群組管理', '表情符號']

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">姓名 <span className="required">*</span></label>
          <input
            type="text"
            className={`form-input ${errors.userName ? 'error' : ''}`}
            value={formData.userName}
            onChange={(e) => handleInputChange('userName', e.target.value)}
            placeholder="請輸入您的姓名"
          />
          {errors.userName && <span className="error-message">{errors.userName}</span>}
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
          <label className="form-label">用戶類型</label>
          <select
            className="form-input"
            value={formData.userType}
            onChange={(e) => handleInputChange('userType', e.target.value)}
          >
            <option value="">請選擇用戶類型</option>
            <option value="personal">個人用戶</option>
            <option value="business">企業用戶</option>
            <option value="student">學生</option>
            <option value="other">其他</option>
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label">使用頻率</label>
          <select
            className="form-input"
            value={formData.usageFrequency}
            onChange={(e) => handleInputChange('usageFrequency', e.target.value)}
          >
            <option value="">請選擇使用頻率</option>
            <option value="每天">每天</option>
            <option value="每週幾次">每週幾次</option>
            <option value="每月幾次">每月幾次</option>
            <option value="很少使用">很少使用</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">使用體驗 <span className="required">*</span></label>
        <div className="radio-group">
          {EXPERIENCES.map(exp => (
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
        {errors.experience && <span className="error-message">{errors.experience}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">最喜歡的功能 (可複選)</label>
        <div className="checkbox-grid">
          {features.map(feature => (
            <label key={feature} className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.favoriteFeatures.includes(feature)}
                onChange={() => handleFeatureChange(feature)}
                className="checkbox-input"
              />
              <span className="checkbox-text">{feature}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">改進建議</label>
        <textarea
          className="form-textarea"
          value={formData.improvements}
          onChange={(e) => handleInputChange('improvements', e.target.value)}
          placeholder="請提供您的改進建議..."
          rows={3}
        />
      </div>

      <div className="form-group">
        <label className="form-label">整體評分 (1-10分)</label>
        <div className="rating-container">
          <input
            type="range"
            min="1"
            max="10"
            value={formData.rating}
            onChange={(e) => handleInputChange('rating', parseInt(e.target.value))}
            className="rating-slider"
          />
          <span className="rating-value">{formData.rating} 分</span>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">詳細回饋 <span className="required">*</span></label>
        <textarea
          className={`form-textarea ${errors.feedback ? 'error' : ''}`}
          value={formData.feedback}
          onChange={(e) => handleInputChange('feedback', e.target.value)}
          placeholder="請分享您的使用感受和建議..."
          rows={4}
        />
        {errors.feedback && <span className="error-message">{errors.feedback}</span>}
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={formData.wouldRecommend}
            onChange={(e) => handleInputChange('wouldRecommend', e.target.checked)}
            className="checkbox-input"
          />
          <span className="checkbox-text">我願意向他人推薦這個產品</span>
        </label>
      </div>

      <div className="form-group">
        <label className="form-label">感興趣的內容 (可複選)</label>
        <div className="checkbox-grid">
          {INTERESTS.map(interest => (
            <label key={interest} className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.interests.includes(interest)}
                onChange={() => handleInterestChange(interest)}
                className="checkbox-input"
              />
              <span className="checkbox-text">{interest}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">其他意見</label>
        <textarea
          className="form-textarea"
          value={formData.additionalComments}
          onChange={(e) => handleInputChange('additionalComments', e.target.value)}
          placeholder="其他想分享的意見或建議..."
          rows={3}
        />
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
