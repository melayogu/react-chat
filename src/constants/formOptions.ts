import type { TabDefinition, SurveyQuestion } from '../types'

// 部門選項
export const DEPARTMENTS = [
  { value: '', label: '請選擇部門' },
  { value: 'tech', label: '技術部' },
  { value: 'sales', label: '業務部' },
  { value: 'support', label: '客服部' },
  { value: 'hr', label: '人力資源部' },
  { value: 'finance', label: '財務部' }
]

// 優先級選項
export const PRIORITIES = [
  { value: 'low', label: '低' },
  { value: 'normal', label: '普通' },
  { value: 'high', label: '高' },
  { value: 'urgent', label: '緊急' }
]

// 行業類別
export const INDUSTRIES = [
  { value: '', label: '請選擇行業' },
  { value: 'tech', label: '科技業' },
  { value: 'finance', label: '金融業' },
  { value: 'retail', label: '零售業' },
  { value: 'manufacturing', label: '製造業' },
  { value: 'healthcare', label: '醫療業' },
  { value: 'education', label: '教育業' },
  { value: 'other', label: '其他' }
]

// 公司規模
export const COMPANY_SIZES = [
  { value: '', label: '請選擇公司規模' },
  { value: 'startup', label: '新創公司 (1-10人)' },
  { value: 'small', label: '小型企業 (11-50人)' },
  { value: 'medium', label: '中型企業 (51-200人)' },
  { value: 'large', label: '大型企業 (201-1000人)' },
  { value: 'enterprise', label: '企業集團 (1000人以上)' }
]

// 專案類型
export const PROJECT_TYPES = [
  { value: '', label: '請選擇專案類型' },
  { value: 'web', label: '網站開發' },
  { value: 'mobile', label: '行動應用' },
  { value: 'desktop', label: '桌面應用' },
  { value: 'system', label: '系統整合' },
  { value: 'ai', label: 'AI/機器學習' },
  { value: 'blockchain', label: '區塊鏈' }
]

// 專案狀態
export const PROJECT_STATUSES = [
  { value: 'planning', label: '規劃中' },
  { value: 'development', label: '開發中' },
  { value: 'testing', label: '測試中' },
  { value: 'deployment', label: '部署中' },
  { value: 'completed', label: '已完成' },
  { value: 'on-hold', label: '暫停' },
  { value: 'cancelled', label: '已取消' }
]

// 技術堆疊
export const TECH_STACKS = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
  { value: 'nodejs', label: 'Node.js' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'php', label: 'PHP' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'mongodb', label: 'MongoDB' },
  { value: 'mysql', label: 'MySQL' },
  { value: 'postgresql', label: 'PostgreSQL' }
]

// 技術選項
export const TECH_OPTIONS = [
  'React', 'Vue', 'Angular', 'Node.js', 'Python', 
  'Java', 'C#', '.NET', 'PHP', 'Go'
]

// 工單類型
export const TICKET_TYPES = [
  { value: '', label: '請選擇問題類型' },
  { value: 'bug', label: '程式錯誤' },
  { value: 'feature', label: '功能需求' },
  { value: 'install', label: '安裝問題' },
  { value: 'config', label: '設定問題' },
  { value: 'performance', label: '效能問題' },
  { value: 'other', label: '其他' }
]

// 緊急程度
export const URGENCY_LEVELS = [
  { value: 'low', label: '低 - 一般諮詢' },
  { value: 'normal', label: '中 - 功能異常' },
  { value: 'high', label: '高 - 影響操作' },
  { value: 'critical', label: '緊急 - 系統停止' }
]

// 體驗選項
export const EXPERIENCES = [
  { value: 'excellent', label: '非常滿意' },
  { value: 'good', label: '滿意' },
  { value: 'average', label: '普通' },
  { value: 'poor', label: '不滿意' },
  { value: 'terrible', label: '非常不滿意' }
]

// 興趣選項
export const INTERESTS = [
  '新功能通知', '產品更新', '技術文章', '活動資訊', '優惠資訊'
]

// 表單標籤頁配置
export const FORM_TABS: TabDefinition[] = [
  { id: 'contact', label: '聯絡表單', icon: '📧' },
  { id: 'customer', label: '客戶資料', icon: '🏢' },
  { id: 'project', label: '專案申請', icon: '📋' },
  { id: 'support', label: '技術支援', icon: '🛠️' },
  { id: 'feedback', label: '意見回饋', icon: '⭐' },
  { id: 'survey', label: '問卷調查', icon: '📊' }
]

// 問卷問題配置
export const SURVEY_QUESTIONS: SurveyQuestion[] = [
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
