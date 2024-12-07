import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'RELOOP - Recycling App',
  description: 'Turn your waste into valuable products',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-green-600 text-white p-4">
          <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
            <Link href="/" className="text-2xl font-bold mb-2 sm:mb-0">RELOOP</Link>
            <div className="space-x-4">
              <Link href="/">Home</Link>
              <Link href="/schedule-pickup">Schedule Pickup</Link>
              <Link href="/dashboard">Dashboard</Link>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
}

