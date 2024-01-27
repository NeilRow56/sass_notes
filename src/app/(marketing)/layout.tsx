import { Navbar } from '@/components/Navbar'

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full bg-slate-100">
      <Navbar />
      <main className="">{children}</main>
    </div>
  )
}

export default MarketingLayout
