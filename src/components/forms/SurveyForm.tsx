import { useState } from 'react'
import type { SurveyFormData, FormComponentProps } from '../../types'
import { SURVEY_QUESTIONS } from '../../constants/formOptions'
import { validateEmail, handleFormSubmit } from '../../utils/formUtils'

export const SurveyForm = ({ formData, setFormData, onClose }: FormComponentProps<SurveyFormData>) => {
  const [errors, setErrors] = useState<Partial<SurveyFormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<SurveyFormData> = {}
    
    if (!formData.participantName.trim()) newErrors.participantName = '參與者姓名不能為空'
    if (!validateEmail(formData.email)) newErrors.email = '請輸入有效的電子郵件地址'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      handleFormSubmit(formData, '問卷調查表單', () => {
        setFormData({
          participantName: '', email: '', age: '', usageFrequency: '',
          features: [], satisfaction: 5, suggestions: '',
          additionalFeedback: '', anonymous: false, marketingConsent: false
        })
        onClose()
      })
    }
  }

  const handleInputChange = (field: keyof SurveyFormData, value: string | number | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleFeatureChange = (feature: string) => {
    const updatedFeatures = formData.features.includes(feature)
      ? formData.features.filter(f => f !== feature)
      : [...formData.features, feature]
    handleInputChange('features', updatedFeatures)
  }

  const generateSampleData = () => {
    setFormData({
      participantName: '張參與者',
      email: 'participant.chang@example.com',
      age: '26-35',
      usageFrequency: '每天',
      features: ['聊天功能', '檔案分享', '群組管理'],
      satisfaction: 8,
      suggestions: '希望能增加更多自定義功能和整合第三方工具的能力。',
      additionalFeedback: '產品整體很不錯，期待持續改進！',
      anonymous: false,
      marketingConsent: true
    })
  }

  const ageQuestion = SURVEY_QUESTIONS.find(q => q.id === 'age')
  const usageQuestion = SURVEY_QUESTIONS.find(q => q.id === 'usage_frequency')
  const featuresQuestion = SURVEY_QUESTIONS.find(q => q.id === 'features')
  const satisfactionQuestion = SURVEY_QUESTIONS.find(q => q.id === 'satisfaction')
  const suggestionsQuestion = SURVEY_QUESTIONS.find(q => q.id === 'suggestions')

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="survey-intro">
        <h3>用戶體驗調查</h3>
        <p>感謝您參與我們的用戶體驗調查！您的意見對我們改進產品非常重要。</p>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">參與者姓名 <span className="required">*</span></label>
          <input
            type="text"
            className={`form-input ${errors.participantName ? 'error' : ''}`}
            value={formData.participantName}
            onChange={(e) => handleInputChange('participantName', e.target.value)}
            placeholder="請輸入您的姓名"
          />
          {errors.participantName && <span className="error-message">{errors.participantName}</span>}
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

      {ageQuestion && (
        <div className="form-group">
          <label className="form-label">{ageQuestion.question}</label>
          <select
            className="form-input"
            value={formData.age}
            onChange={(e) => handleInputChange('age', e.target.value)}
          >
            <option value="">請選擇年齡範圍</option>
            {ageQuestion.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      )}

      {usageQuestion && (
        <div className="form-group">
          <label className="form-label">{usageQuestion.question}</label>
          <div className="radio-group">
            {usageQuestion.options?.map(option => (
              <label key={option} className="radio-label">
                <input
                  type="radio"
                  name="usageFrequency"
                  value={option}
                  checked={formData.usageFrequency === option}
                  onChange={(e) => handleInputChange('usageFrequency', e.target.value)}
                  className="radio-input"
                />
                <span className="radio-text">{option}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {featuresQuestion && (
        <div className="form-group">
          <label className="form-label">{featuresQuestion.question}</label>
          <div className="checkbox-grid">
            {featuresQuestion.options?.map(option => (
              <label key={option} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.features.includes(option)}
                  onChange={() => handleFeatureChange(option)}
                  className="checkbox-input"
                />
                <span className="checkbox-text">{option}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {satisfactionQuestion && (
        <div className="form-group">
          <label className="form-label">{satisfactionQuestion.question}</label>
          <div className="rating-container">
            <input
              type="range"
              min={satisfactionQuestion.min || 1}
              max={satisfactionQuestion.max || 10}
              value={formData.satisfaction}
              onChange={(e) => handleInputChange('satisfaction', parseInt(e.target.value))}
              className="rating-slider"
            />
            <span className="rating-value">{formData.satisfaction} 分</span>
          </div>
          <div className="rating-labels">
            <span>非常不滿意</span>
            <span>非常滿意</span>
          </div>
        </div>
      )}

      {suggestionsQuestion && (
        <div className="form-group">
          <label className="form-label">{suggestionsQuestion.question}</label>
          <textarea
            className="form-textarea"
            value={formData.suggestions}
            onChange={(e) => handleInputChange('suggestions', e.target.value)}
            placeholder="請分享您的建議..."
            rows={4}
          />
        </div>
      )}

      <div className="form-group">
        <label className="form-label">其他回饋</label>
        <textarea
          className="form-textarea"
          value={formData.additionalFeedback}
          onChange={(e) => handleInputChange('additionalFeedback', e.target.value)}
          placeholder="您還有其他想分享的意見嗎？"
          rows={3}
        />
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={formData.anonymous}
            onChange={(e) => handleInputChange('anonymous', e.target.checked)}
            className="checkbox-input"
          />
          <span className="checkbox-text">匿名提交回饋</span>
        </label>
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={formData.marketingConsent}
            onChange={(e) => handleInputChange('marketingConsent', e.target.checked)}
            className="checkbox-input"
          />
          <span className="checkbox-text">同意接收產品更新和行銷資訊</span>
        </label>
      </div>

      <div className="survey-footer">
        <p className="privacy-notice">
          您的個人資料將依照我們的隱私政策處理，僅用於改善產品體驗。
        </p>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={generateSampleData}>
          產生範例資料
        </button>
        <div className="form-actions-right">
          <button type="button" className="btn btn-cancel" onClick={onClose}>取消</button>
          <button type="submit" className="btn btn-primary">提交調查</button>
        </div>
      </div>
    </form>
  )
}
