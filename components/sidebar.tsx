"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { memo } from "react"
import {
  LayoutDashboard,
  Users,
  CreditCard,
  FileText,
  Settings,
  Bell,
  AlertTriangle,
  HelpCircle,
  BarChart3,
  ShoppingCart,
  Package,
  FolderKanban,
  MessagesSquare,
  BookOpen,
  Wrench,
  Shield,
  Activity,
  FileBarChart,
  LogOut,
  Github,
  Linkedin,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Profile", href: "/profile", icon: Users },
  {
    name: "Financial",
    id: "financial",
    icon: CreditCard,
    children: [
      { name: "Transactions", href: "/transactions", icon: CreditCard },
      { name: "Invoices", href: "/invoices", icon: FileText },
      { name: "Financial Reports", href: "/reports/financial", icon: FileBarChart },
    ],
  },
  {
    name: "Management",
    id: "management",
    icon: Package,
    children: [
      { name: "Projects", href: "/projects", icon: FolderKanban },
      { name: "Products", href: "/products", icon: Package },
      { name: "Orders", href: "/orders", icon: ShoppingCart },
      { name: "Users", href: "/users", icon: Users },
    ],
  },
  { name: "Analytics", href: "/analytics", icon: FileBarChart },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Alerts", href: "/alerts", icon: AlertTriangle },
  { name: "Activities", href: "/activities", icon: Activity },
  { name: "Support", href: "/support", icon: MessagesSquare },
  { name: "FAQ", href: "/faq", icon: HelpCircle },
  { name: "Articles", href: "/articles", icon: BookOpen },
  { name: "Tools", href: "/tools", icon: Wrench },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Security", href: "/security", icon: Shield },
]

const NavItem = memo(({ item, pathname }: { item: any; pathname: string }) => {
  const Icon = item.icon
  const isActive = pathname === item.href

  if ("children" in item && item.children) {
    const isChildActive = item.children.some((child: any) => child.href === pathname)

    return (
      <details className="group" open={isChildActive}>
        <summary className="flex items-center justify-between gap-2 px-3 py-2 text-sm font-medium transition-colors text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer list-none">
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-4" />
            {item.name}
          </div>
          <svg
            className="w-3.5 h-3.5 transition-transform duration-200 group-open:rotate-90"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </summary>
        <div className="ml-6 mt-0.5 space-y-0.5 overflow-hidden">
          {item.children.map((child: any) => {
            const ChildIcon = child.icon
            const isChildActiveLink = pathname === child.href
            return (
              <Link
                key={child.name}
                href={child.href}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                  isChildActiveLink
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                <ChildIcon className="w-3.5 h-3.5" />
                {child.name}
              </Link>
            )
          })}
        </div>
      </details>
    )
  }

  return (
    <Link
      href={item.href!}
      className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      }`}
    >
      <Icon className="w-4 h-4" />
      {item.name}
    </Link>
  )
})
NavItem.displayName = "NavItem"

export const Sidebar = memo(function Sidebar() {
  const pathname = usePathname()
  const { logout, user } = useAuth()

  return (
    <div className="flex flex-col h-full bg-sidebar border-r border-sidebar-border">
      <div className="p-5 border-b border-sidebar-border">
        <h2 className="text-lg font-bold text-sidebar-foreground tracking-tight font-mono">NextBoard</h2>
        {user && <p className="text-xs text-muted-foreground mt-1">{user.name}</p>}
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
        {navigation.map((item) => (
          <NavItem key={item.name} item={item} pathname={pathname} />
        ))}
      </nav>

      <div className="p-3 border-t border-sidebar-border space-y-2">
        <div className="px-3 py-2 bg-sidebar-accent/30 space-y-1.5">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Developer</p>
          <p className="text-xs font-bold text-sidebar-foreground">Milad Joodi</p>
          <div className="flex gap-2">
            <a
              href="https://github.com/MiladJoodi/NextBoard"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-sidebar-foreground transition-colors cursor-pointer"
            >
              <Github className="w-3 h-3" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/joodi/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-sidebar-foreground transition-colors cursor-pointer"
            >
              <Linkedin className="w-3 h-3" />
              LinkedIn
            </a>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 px-3 py-2 w-full text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  )
})
