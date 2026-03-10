import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdminButton from '@/components/admin/AdminButton'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Golden Eagle Properties Ltd',
  description: 'Find your dream property in Lilongwe, Malawi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <AdminButton />
        </div>
      </body>
    </html>
  )
}