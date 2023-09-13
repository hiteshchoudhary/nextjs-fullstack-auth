import Navbar from '@/components/NavBar'
import ServiceGrid from '@/components/ServicesGrid'
import Image from 'next/image'


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      {/* Content for mobile */}
      <div className="text-center">
        <div className="mb-24">
          <Navbar />
        </div>
        <h1 className="text-3xl font-semibold">Welcome to My Website</h1>
        <p className="text-sm">This is the mobile version.</p>
        <ServiceGrid/>
      </div>
    </main>
  )
}
