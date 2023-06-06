import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ary Indarapu',
  description: 'Personal website for Aryan Indarapu.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
