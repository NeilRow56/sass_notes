import { DashboardNavbar } from '@/components/dashboard/DashboardNavbar'
import { UserNav } from '@/components/dashboard/UserNav'

import { db } from '@/lib/db'
import { auth, currentUser } from '@clerk/nextjs'

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

interface getDataProps {
  email: string
  id: string
  firstName: string | undefined | null
  lastName: string | undefined | null
}

async function getData({ email, id, firstName, lastName }: getDataProps) {
  const user = await db.user.findUnique({
    where: {
      id,
      email,
    },
    select: {
      id: true,
    },
  })

  if (!user) {
    const name = `${firstName ?? ''} ${lastName ?? ''}`
    await db.user.create({
      data: {
        id: id,
        email: email,
        name: name,
      },
    })
  }
}

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const user = await currentUser()

  if (!user) {
    return redirect('/')
  }

  const { sessionClaims } = auth()

  const firstName = sessionClaims?.firstName
  const email = sessionClaims?.email
  const userId = sessionClaims?.id
  const lastName = sessionClaims?.lastName

  await getData({
    email: email as string,
    firstName: firstName as string,
    id: userId as string,
    lastName: lastName as string,
  })
  return (
    <div className="flex w-full flex-col">
      <nav className=" mx-auto flex h-16 w-full max-w-7xl  items-center justify-between border-b border-slate-600 px-12">
        <Link href="/" className="flex items-center text-3xl font-bold">
          <h1 className="text-3xl font-bold">Sass </h1>
          <span className="text-primary">Notes</span>
        </Link>
        <UserNav email="dave@bt.com" name="Dave" />
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
