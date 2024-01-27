import { DashboardNavbar } from '@/components/dashboard/DashboardNavbar'
import { UserNav } from '@/components/dashboard/UserNav'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ReactNode } from 'react'

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex w-full flex-col">
      <nav className=" mx-auto flex h-16 w-full max-w-7xl  items-center justify-between border-b border-slate-600 px-12">
        <Link href="/" className="flex items-center text-3xl font-bold">
          <h1 className="text-3xl font-bold">Sass </h1>
          <span className="text-primary">Notes</span>
        </Link>
        <UserNav email="dave@bt.com" image="/profile.jpg" name="Dave" />
      </nav>
      <div className="mt-10 flex flex-col space-y-6 ">
        <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
          <aside className="hidden w-[200px] flex-col md:flex">
            <DashboardNavbar />
          </aside>
          <main>{children}</main>
        </div>
      </div>
    </div>
  )
}
