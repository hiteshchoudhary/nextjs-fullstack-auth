import Image from 'next/image'


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      {/* Content for mobile */}
      <div className="text-center">
        <h1 className="text-3xl font-semibold">Welcome to My Website</h1>
        <p className="text-sm">This is the mobile version.</p>
      </div>
      
      {/* Media query for larger screens */}
      <style jsx>{`
        @media (min-width: 768px) {
          .text-3xl {
            font-size: 4rem;
          }
          .text-sm {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </main>
  )
}
