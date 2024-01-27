'use client'

import { cn } from '@/lib/utils'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navItems } from './UserNav'
import { UserButton } from '@clerk/nextjs'
import { ThemeToggle } from '../ThemeToggle'

export function DashboardNavbar() {
  const pathname = usePathname()
  console.log(pathname)
  return (
    <nav className="mt-4 grid items-start gap-2">
      {navItems.map((item, index) => (
        <Link key={index} href={item.href}>
          <span
            className={cn(
              'group flex  items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-orange-200 hover:text-accent-foreground dark:hover:bg-slate-500',
              pathname === item.href
                ? 'bg-orange-50 dark:bg-slate-800'
                : 'bg-transparent'
            )}
          >
            <item.icon className="mr-2 h-4 w-4 text-primary" />
            <span>{item.name}</span>
          </span>
        </Link>
      ))}
      <div className="flex- ml-4 flex-col space-y-5">
        <UserButton afterSignOutUrl="/" />
        <ThemeToggle />
      </div>
    </nav>
  )
}
