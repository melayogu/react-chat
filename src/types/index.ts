// 聊天室相關類型
export interface ChatRoom {
  id: string
  name: string
  onlineCount: number
}

// 基礎表單數據
export interface FormData {
  name: string
  email: string
  phone: string
  department: string
  message: string
  priority: string
  subscribe: boolean
}

// 客戶表單數據
export interface CustomerFormData {
  companyName: string
  contactPerson: string
  email: string
  phone: string
  address: string
  industry: string
  companySize: string
  requirements: string
  budget: string
  timeline: string
}

// 專案表單數據
export interface ProjectFormData {
  projectName: string
  projectManager: string
  email: string
  projectType: string
  description: string
  startDate: string
  endDate: string
  budget: string
  teamSize: string
  techStack: string[]
  status: string
  priority: string
  notes: string
}

// 技術支援表單數據
export interface SupportFormData {
  customerName: string
  email: string
  phone: string
  company: string
  ticketType: string
  subject: string
  description: string
  urgency: string
  affectedUsers: string
  environment: string
  reproductionSteps: string
  expectedBehavior: string
  actualBehavior: string
  attachments: string[]
  relatedSystems: string[]
}

// 回饋表單數據
export interface FeedbackFormData {
  userName: string
  email: string
  userType: string
  experience: string
  usageFrequency: string
  favoriteFeatures: string[]
  improvements: string
  rating: number
  feedback: string
  wouldRecommend: boolean
  interests: string[]
  additionalComments: string
}

// 問卷調查表單數據
export interface SurveyFormData {
  participantName: string
  email: string
  age: string
  usageFrequency: string
  features: string[]
  satisfaction: number
  suggestions: string
  additionalFeedback: string
  anonymous: boolean
  marketingConsent: boolean
}

// 表單組件通用屬性
export interface FormComponentProps<T> {
  formData: T
  setFormData: React.Dispatch<React.SetStateAction<T>>
  onClose: () => void
}

// 標籤頁定義
export interface TabDefinition {
  id: string
  label: string
  icon: string
}

// 問卷問題類型
export interface SurveyQuestion {
  id: string
  type: 'select' | 'radio' | 'checkbox' | 'range' | 'textarea'
  question: string
  options?: string[]
  min?: number
  max?: number
}

// Top Menu 組件屬性
export interface TopMenuProps {
  onSearchClick: () => void
  onFormClick: () => void
  onNotificationClick: () => void
}

// Multi Form Modal 組件屬性
export interface MultiFormModalProps {
  isOpen: boolean
  onClose: () => void
}
