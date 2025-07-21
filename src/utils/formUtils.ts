import type { FormData, CustomerFormData, ProjectFormData } from '../types'

// 驗證電子郵件格式
export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// 驗證電話號碼格式
export const validatePhone = (phone: string): boolean => {
  return /^[\d\-()+ ]+$/.test(phone)
}

// 聯絡表單驗證
export const validateContactForm = (formData: FormData): Partial<FormData> => {
  const errors: Partial<FormData> = {}
  
  if (!formData.name.trim()) {
    errors.name = '姓名為必填項目'
  }
  
  if (!formData.email.trim()) {
    errors.email = '電子郵件為必填項目'
  } else if (!validateEmail(formData.email)) {
    errors.email = '請輸入有效的電子郵件格式'
  }
  
  if (!formData.phone.trim()) {
    errors.phone = '電話號碼為必填項目'
  } else if (!validatePhone(formData.phone)) {
    errors.phone = '請輸入有效的電話號碼'
  }
  
  if (!formData.department) {
    errors.department = '請選擇部門'
  }
  
  if (!formData.message.trim()) {
    errors.message = '訊息內容為必填項目'
  }
  
  return errors
}

// 生成聯絡表單範例資料
export const generateContactSampleData = (): FormData => ({
  name: '王小明',
  email: 'wang.xiaoming@example.com',
  phone: '0912-345-678',
  department: 'tech',
  message: '您好，我想詢問關於新產品的技術支援問題。',
  priority: 'high',
  subscribe: true
})

// 生成客戶表單範例資料
export const generateCustomerSampleData = (): CustomerFormData => ({
  companyName: '科技創新股份有限公司',
  contactPerson: '張經理',
  email: 'manager.chang@techco.com',
  phone: '02-1234-5678',
  address: '台北市信義區信義路五段7號',
  industry: 'tech',
  companySize: 'medium',
  requirements: '我們需要開發一個企業級的客戶管理系統，包含銷售流程管理、客戶資料分析等功能。',
  budget: '200-500萬',
  timeline: '6個月內完成'
})

// 生成專案表單範例資料
export const generateProjectSampleData = (): ProjectFormData => ({
  projectName: '企業數位轉型系統',
  projectManager: '李專案經理',
  email: 'pm.lee@company.com',
  projectType: 'web',
  description: '建立全方位的企業數位化平台，整合ERP、CRM和HR系統，提升營運效率。',
  startDate: '2024-03-01',
  endDate: '2024-12-31',
  budget: '1000萬',
  teamSize: '8',
  techStack: ['react', 'nodejs', 'postgresql', 'mongodb'],
  status: 'planning',
  priority: 'high',
  notes: '此專案為公司年度重點項目，需要與多個部門協調配合。'
})

// 表單提交處理
export const handleFormSubmit = (
  formData: unknown, 
  formName: string, 
  onSuccess?: () => void
): void => {
  // 模擬提交
  console.log(`${formName}提交成功:`, formData)
  alert(`${formName}提交成功！`)
  
  if (onSuccess) {
    onSuccess()
  }
}
