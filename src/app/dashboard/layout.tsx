import { DashboardNavbar } from '@/components/dashboard/DashboardNavbar'
import { ReactNode } from 'react'

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="mt-10 flex flex-col space-y-6 ">
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNavbar />
        </aside>
        <main>{children}</main>
      </div>
    </div>
  )
}
