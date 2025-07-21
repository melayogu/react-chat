import { useState } from 'react'
import type { 
  MultiFormModalProps,
  FormData,
  CustomerFormData,
  ProjectFormData,
  SupportFormData,
  FeedbackFormData,
  SurveyFormData,
  TabDefinition
} from '../../types'
import { FORM_TABS } from '../../constants/formOptions'
import {
  ContactForm,
  CustomerForm,
  ProjectForm,
  SupportForm,
  FeedbackForm,
  SurveyForm
} from '../forms'

export const MultiFormModal = ({ isOpen, onClose }: MultiFormModalProps) => {
  const [activeTab, setActiveTab] = useState<string>('contact')
  
  // 各表單的狀態
  const [contactFormData, setContactFormData] = useState<FormData>({
    name: '', email: '', phone: '', department: '', 
    message: '', priority: 'normal', subscribe: false
  })
  
  const [customerFormData, setCustomerFormData] = useState<CustomerFormData>({
    companyName: '', contactPerson: '', email: '', phone: '',
    address: '', industry: '', companySize: '',
    requirements: '', budget: '', timeline: ''
  })
  
  const [projectFormData, setProjectFormData] = useState<ProjectFormData>({
    projectName: '', projectManager: '', email: '', projectType: '',
    description: '', startDate: '', endDate: '', budget: '',
    teamSize: '', techStack: [], status: 'planning',
    priority: 'medium', notes: ''
  })
  
  const [supportFormData, setSupportFormData] = useState<SupportFormData>({
    customerName: '', email: '', phone: '', company: '',
    ticketType: '', subject: '', description: '',
    urgency: 'normal', affectedUsers: '', environment: '',
    reproductionSteps: '', expectedBehavior: '', actualBehavior: '',
    attachments: [], relatedSystems: []
  })
  
  const [feedbackFormData, setFeedbackFormData] = useState<FeedbackFormData>({
    userName: '', email: '', userType: '', experience: '',
    usageFrequency: '', favoriteFeatures: [], improvements: '',
    rating: 5, feedback: '', wouldRecommend: false,
    interests: [], additionalComments: ''
  })
  
  const [surveyFormData, setSurveyFormData] = useState<SurveyFormData>({
    participantName: '', email: '', age: '', usageFrequency: '',
    features: [], satisfaction: 5, suggestions: '',
    additionalFeedback: '', anonymous: false, marketingConsent: false
  })

  if (!isOpen) return null

  const renderActiveForm = () => {
    switch (activeTab) {
      case 'contact':
        return (
          <ContactForm
            formData={contactFormData}
            setFormData={setContactFormData}
            onClose={onClose}
          />
        )
      case 'customer':
        return (
          <CustomerForm
            formData={customerFormData}
            setFormData={setCustomerFormData}
            onClose={onClose}
          />
        )
      case 'project':
        return (
          <ProjectForm
            formData={projectFormData}
            setFormData={setProjectFormData}
            onClose={onClose}
          />
        )
      case 'support':
        return (
          <SupportForm
            formData={supportFormData}
            setFormData={setSupportFormData}
            onClose={onClose}
          />
        )
      case 'feedback':
        return (
          <FeedbackForm
            formData={feedbackFormData}
            setFormData={setFeedbackFormData}
            onClose={onClose}
          />
        )
      case 'survey':
        return (
          <SurveyForm
            formData={surveyFormData}
            setFormData={setSurveyFormData}
            onClose={onClose}
          />
        )
      default:
        return null
    }
  }

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">多功能表單</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="form-tabs">
          {FORM_TABS.map((tab: TabDefinition) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabClick(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>
        
        <div className="modal-content">
          {renderActiveForm()}
        </div>
      </div>
    </div>
  )
}
