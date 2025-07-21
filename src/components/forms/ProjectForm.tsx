import { useState } from 'react'
import type { ProjectFormData, FormComponentProps } from '../../types'
import { PROJECT_TYPES, PROJECT_STATUSES, TECH_STACKS } from '../../constants/formOptions'
import { validateEmail, generateProjectSampleData, handleFormSubmit } from '../../utils/formUtils'

export const ProjectForm = ({ formData, setFormData, onClose }: FormComponentProps<ProjectFormData>) => {
  const [errors, setErrors] = useState<Partial<ProjectFormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<ProjectFormData> = {}
    
    if (!formData.projectName.trim()) newErrors.projectName = '專案名稱不能為空'
    if (!formData.projectManager.trim()) newErrors.projectManager = '專案經理不能為空'
    if (!validateEmail(formData.email)) newErrors.email = '請輸入有效的電子郵件地址'
    if (!formData.projectType) newErrors.projectType = '請選擇專案類型'
    if (!formData.description.trim()) newErrors.description = '專案描述不能為空'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      handleFormSubmit(formData, '專案表單', () => {
        setFormData({
          projectName: '', projectManager: '', email: '', projectType: '',
          description: '', startDate: '', endDate: '', budget: '',
          teamSize: '', techStack: [], status: 'planning',
          priority: 'medium', notes: ''
        })
        onClose()
      })
    }
  }

  const handleInputChange = (field: keyof ProjectFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleTechStackChange = (tech: string) => {
    const updatedTechStack = formData.techStack.includes(tech)
      ? formData.techStack.filter(t => t !== tech)
      : [...formData.techStack, tech]
    handleInputChange('techStack', updatedTechStack)
  }

  const generateSampleData = () => {
    setFormData(generateProjectSampleData())
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">專案名稱 <span className="required">*</span></label>
          <input
            type="text"
            className={`form-input ${errors.projectName ? 'error' : ''}`}
            value={formData.projectName}
            onChange={(e) => handleInputChange('projectName', e.target.value)}
            placeholder="請輸入專案名稱"
          />
          {errors.projectName && <span className="error-message">{errors.projectName}</span>}
        </div>
        
        <div className="form-group">
          <label className="form-label">專案經理 <span className="required">*</span></label>
          <input
            type="text"
            className={`form-input ${errors.projectManager ? 'error' : ''}`}
            value={formData.projectManager}
            onChange={(e) => handleInputChange('projectManager', e.target.value)}
            placeholder="請輸入專案經理姓名"
          />
          {errors.projectManager && <span className="error-message">{errors.projectManager}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">聯絡信箱 <span className="required">*</span></label>
          <input
            type="email"
            className={`form-input ${errors.email ? 'error' : ''}`}
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="pm@company.com"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        
        <div className="form-group">
          <label className="form-label">專案類型 <span className="required">*</span></label>
          <select
            className={`form-input ${errors.projectType ? 'error' : ''}`}
            value={formData.projectType}
            onChange={(e) => handleInputChange('projectType', e.target.value)}
          >
            {PROJECT_TYPES.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
          {errors.projectType && <span className="error-message">{errors.projectType}</span>}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">專案描述 <span className="required">*</span></label>
        <textarea
          className={`form-textarea ${errors.description ? 'error' : ''}`}
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="請詳細描述專案內容、目標和預期成果..."
          rows={4}
        />
        {errors.description && <span className="error-message">{errors.description}</span>}
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
          <label className="form-label">結束日期</label>
          <input
            type="date"
            className="form-input"
            value={formData.endDate}
            onChange={(e) => handleInputChange('endDate', e.target.value)}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">預算</label>
          <input
            type="text"
            className="form-input"
            value={formData.budget}
            onChange={(e) => handleInputChange('budget', e.target.value)}
            placeholder="例：500萬"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">團隊規模</label>
          <input
            type="number"
            className="form-input"
            value={formData.teamSize}
            onChange={(e) => handleInputChange('teamSize', e.target.value)}
            placeholder="團隊人數"
            min="1"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">技術堆疊</label>
        <div className="checkbox-grid">
          {TECH_STACKS.map(tech => (
            <label key={tech.value} className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.techStack.includes(tech.value)}
                onChange={() => handleTechStackChange(tech.value)}
                className="checkbox-input"
              />
              <span className="checkbox-text">{tech.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">專案狀態</label>
          <select
            className="form-input"
            value={formData.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
          >
            {PROJECT_STATUSES.map(status => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label">優先級</label>
          <select
            className="form-input"
            value={formData.priority}
            onChange={(e) => handleInputChange('priority', e.target.value)}
          >
            <option value="low">低</option>
            <option value="medium">中</option>
            <option value="high">高</option>
            <option value="urgent">緊急</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">備註</label>
        <textarea
          className="form-textarea"
          value={formData.notes}
          onChange={(e) => handleInputChange('notes', e.target.value)}
          placeholder="其他相關資訊或特殊需求..."
          rows={3}
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
