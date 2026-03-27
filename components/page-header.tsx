import type React from "react"
interface PageHeaderProps {
  title: string
  description?: string
  action?: React.ReactNode
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        {description && <p className="text-zinc-400">{description}</p>}
      </div>
      {action}
    </div>
  )
}
