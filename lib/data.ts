// Central data store for the entire dashboard application

export interface User {
  id: string
  email: string
  password: string
  name: string
  role: "admin" | "user" | "manager"
  avatar?: string
  phone?: string
  department?: string
  status: "online" | "away" | "offline"
  createdAt: string
  lastLogin?: string
}

export interface Transaction {
  id: string
  userId: string
  type: "income" | "expense" | "transfer"
  amount: number
  currency: string
  category: string
  description: string
  date: string
  status: "completed" | "pending" | "failed"
}

export interface Project {
  id: string
  name: string
  description: string
  status: "active" | "completed" | "on-hold" | "cancelled"
  progress: number
  startDate: string
  endDate?: string
  budget: number
  spent: number
  managerId: string
  teamMembers: string[]
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  category: string
  image?: string
  sku: string
  status: "active" | "inactive"
}

export interface Order {
  id: string
  userId: string
  products: { productId: string; quantity: number; price: number }[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  date: string
  shippingAddress: string
}

export interface Invoice {
  id: string
  orderId: string
  userId: string
  amount: number
  tax: number
  total: number
  date: string
  dueDate: string
  status: "paid" | "pending" | "overdue"
  items: { description: string; quantity: number; price: number }[]
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: "info" | "warning" | "error" | "success"
  read: boolean
  date: string
}

export interface Alert {
  id: string
  title: string
  message: string
  severity: "low" | "medium" | "high" | "critical"
  date: string
  resolved: boolean
}

export interface Activity {
  id: string
  userId: string
  action: string
  target: string
  timestamp: string
  details?: string
}

export interface Category {
  id: string
  name: string
  description: string
  parentId?: string
  icon?: string
}

export interface SupportTicket {
  id: string
  userId: string
  subject: string
  message: string
  status: "open" | "in-progress" | "resolved" | "closed"
  priority: "low" | "medium" | "high"
  createdAt: string
  updatedAt: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  views: number
}

export interface Article {
  id: string
  title: string
  content: string
  author: string
  category: string
  publishDate: string
  views: number
  tags: string[]
}

export interface ErrorLog {
  id: string
  message: string
  stack?: string
  severity: "low" | "medium" | "high" | "critical"
  timestamp: string
  resolved: boolean
  userId?: string
}

export interface SystemSettings {
  id: string
  key: string
  value: string
  description: string
  category: string
}

// Mock Data
export const users: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    password: "admin123",
    name: "Sarah Chen",
    role: "admin",
    avatar: "SC",
    phone: "+1234567890",
    department: "Management",
    status: "online",
    createdAt: "2024-01-15",
    lastLogin: "2024-12-21",
  },
  {
    id: "2",
    email: "marcus@example.com",
    password: "user123",
    name: "Marcus Johnson",
    role: "user",
    avatar: "MJ",
    phone: "+1234567891",
    department: "Engineering",
    status: "online",
    createdAt: "2024-02-20",
    lastLogin: "2024-12-21",
  },
  {
    id: "3",
    email: "emily@example.com",
    password: "user123",
    name: "Emily Rodriguez",
    role: "manager",
    avatar: "ER",
    phone: "+1234567892",
    department: "Design",
    status: "away",
    createdAt: "2024-03-10",
    lastLogin: "2024-12-20",
  },
  {
    id: "4",
    email: "alex@example.com",
    password: "user123",
    name: "Alex Kim",
    role: "user",
    avatar: "AK",
    phone: "+1234567893",
    department: "Engineering",
    status: "offline",
    createdAt: "2024-04-05",
    lastLogin: "2024-12-19",
  },
]

export const transactions: Transaction[] = [
  {
    id: "T001",
    userId: "1",
    type: "income",
    amount: 5000,
    currency: "USD",
    category: "Sales",
    description: "Product sales revenue",
    date: "2024-12-20",
    status: "completed",
  },
  {
    id: "T002",
    userId: "2",
    type: "expense",
    amount: 1200,
    currency: "USD",
    category: "Office Supplies",
    description: "Monthly office supplies",
    date: "2024-12-19",
    status: "completed",
  },
  {
    id: "T003",
    userId: "1",
    type: "income",
    amount: 3500,
    currency: "USD",
    category: "Consulting",
    description: "Consulting services",
    date: "2024-12-18",
    status: "pending",
  },
]

export const projects: Project[] = [
  {
    id: "P001",
    name: "Website Redesign",
    description: "Complete redesign of company website",
    status: "active",
    progress: 65,
    startDate: "2024-11-01",
    budget: 50000,
    spent: 32500,
    managerId: "3",
    teamMembers: ["2", "4"],
  },
  {
    id: "P002",
    name: "Mobile App Development",
    description: "New mobile application for customers",
    status: "active",
    progress: 40,
    startDate: "2024-10-15",
    budget: 100000,
    spent: 40000,
    managerId: "1",
    teamMembers: ["2", "3", "4"],
  },
]

export const products: Product[] = [
  {
    id: "PRD001",
    name: "Premium Dashboard Template",
    description: "Professional admin dashboard template",
    price: 49.99,
    stock: 150,
    category: "Templates",
    sku: "DASH-PRE-001",
    status: "active",
  },
  {
    id: "PRD002",
    name: "React Component Library",
    description: "Reusable React components",
    price: 79.99,
    stock: 200,
    category: "Libraries",
    sku: "COMP-LIB-001",
    status: "active",
  },
]

export const orders: Order[] = [
  {
    id: "ORD001",
    userId: "2",
    products: [{ productId: "PRD001", quantity: 2, price: 49.99 }],
    total: 99.98,
    status: "delivered",
    date: "2024-12-15",
    shippingAddress: "123 Main St, City, Country",
  },
  {
    id: "ORD002",
    userId: "3",
    products: [{ productId: "PRD002", quantity: 1, price: 79.99 }],
    total: 79.99,
    status: "processing",
    date: "2024-12-20",
    shippingAddress: "456 Oak Ave, City, Country",
  },
]

export const invoices: Invoice[] = [
  {
    id: "INV001",
    orderId: "ORD001",
    userId: "2",
    amount: 99.98,
    tax: 9.99,
    total: 109.97,
    date: "2024-12-15",
    dueDate: "2024-12-30",
    status: "paid",
    items: [{ description: "Premium Dashboard Template", quantity: 2, price: 49.99 }],
  },
  {
    id: "INV002",
    orderId: "ORD002",
    userId: "3",
    amount: 79.99,
    tax: 7.99,
    total: 87.98,
    date: "2024-12-20",
    dueDate: "2025-01-05",
    status: "pending",
    items: [{ description: "React Component Library", quantity: 1, price: 79.99 }],
  },
]

export const notifications: Notification[] = [
  {
    id: "N001",
    userId: "1",
    title: "New Order Received",
    message: "Order #ORD002 has been placed",
    type: "info",
    read: false,
    date: "2024-12-21T10:30:00",
  },
  {
    id: "N002",
    userId: "1",
    title: "Payment Confirmed",
    message: "Payment for invoice INV001 has been received",
    type: "success",
    read: true,
    date: "2024-12-20T15:20:00",
  },
]

export const alerts: Alert[] = [
  {
    id: "A001",
    title: "Low Stock Alert",
    message: "Product PRD001 stock is running low",
    severity: "medium",
    date: "2024-12-21T09:00:00",
    resolved: false,
  },
  {
    id: "A002",
    title: "Server Load High",
    message: "Server CPU usage above 80%",
    severity: "high",
    date: "2024-12-21T08:30:00",
    resolved: true,
  },
]

export const activities: Activity[] = [
  {
    id: "ACT001",
    userId: "1",
    action: "commented on",
    target: "Project Alpha",
    timestamp: "2024-12-21T10:00:00",
    details: "Added feedback on design",
  },
  {
    id: "ACT002",
    userId: "2",
    action: "pushed to",
    target: "main branch",
    timestamp: "2024-12-21T09:45:00",
    details: "Updated authentication module",
  },
  {
    id: "ACT003",
    userId: "3",
    action: "uploaded",
    target: "new designs",
    timestamp: "2024-12-21T09:00:00",
    details: "UI mockups for mobile app",
  },
]

export const categories: Category[] = [
  { id: "CAT001", name: "Templates", description: "Web and app templates" },
  { id: "CAT002", name: "Libraries", description: "Code libraries and frameworks" },
  { id: "CAT003", name: "Tools", description: "Development tools" },
  { id: "CAT004", name: "Education", description: "Learning resources" },
]

export const supportTickets: SupportTicket[] = [
  {
    id: "TKT001",
    userId: "2",
    subject: "Unable to download product",
    message: "I purchased a template but cannot download it",
    status: "in-progress",
    priority: "high",
    createdAt: "2024-12-20T14:00:00",
    updatedAt: "2024-12-21T09:00:00",
  },
  {
    id: "TKT002",
    userId: "4",
    subject: "Question about licensing",
    message: "Can I use this in multiple projects?",
    status: "resolved",
    priority: "medium",
    createdAt: "2024-12-19T10:00:00",
    updatedAt: "2024-12-19T16:00:00",
  },
]

export const faqs: FAQ[] = [
  {
    id: "FAQ001",
    question: "How do I reset my password?",
    answer: 'You can reset your password by clicking the "Forgot Password" link on the login page.',
    category: "Account",
    views: 1250,
  },
  {
    id: "FAQ002",
    question: "What payment methods do you accept?",
    answer: "We accept credit cards, PayPal, and bank transfers.",
    category: "Payments",
    views: 890,
  },
  {
    id: "FAQ003",
    question: "Can I get a refund?",
    answer: "Yes, we offer a 30-day money-back guarantee on all purchases.",
    category: "Refunds",
    views: 745,
  },
]

export const articles: Article[] = [
  {
    id: "ART001",
    title: "Getting Started with React",
    content: "Learn the basics of React development...",
    author: "Sarah Chen",
    category: "Tutorials",
    publishDate: "2024-12-15",
    views: 5420,
    tags: ["react", "javascript", "beginner"],
  },
  {
    id: "ART002",
    title: "Advanced TypeScript Patterns",
    content: "Explore advanced TypeScript techniques...",
    author: "Marcus Johnson",
    category: "Advanced",
    publishDate: "2024-12-10",
    views: 3210,
    tags: ["typescript", "patterns", "advanced"],
  },
]

export const errorLogs: ErrorLog[] = [
  {
    id: "ERR001",
    message: "Database connection timeout",
    stack: "Error: Connection timeout...",
    severity: "high",
    timestamp: "2024-12-21T08:15:00",
    resolved: false,
    userId: "2",
  },
  {
    id: "ERR002",
    message: "Failed to send email notification",
    severity: "medium",
    timestamp: "2024-12-20T16:30:00",
    resolved: true,
  },
]

export const systemSettings: SystemSettings[] = [
  {
    id: "SET001",
    key: "site_name",
    value: "NextBoard",
    description: "Website name",
    category: "General",
  },
  {
    id: "SET002",
    key: "default_language",
    value: "en",
    description: "Default system language",
    category: "Localization",
  },
  {
    id: "SET003",
    key: "maintenance_mode",
    value: "false",
    description: "Enable maintenance mode",
    category: "System",
  },
]

// Dashboard stats
export const dashboardStats = {
  totalProjects: 24,
  activeTasks: 142,
  teamMembers: 8,
  completion: 87,
  totalRevenue: 125000,
  monthlyGrowth: 12.5,
  activeUsers: 1250,
  newUsers: 145,
}
