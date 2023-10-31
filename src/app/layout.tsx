import NextAuthSessionProvider from '@/providers/nextAuthSessionProvider'
import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

const roboto = Roboto({ style: ['normal'], weight: ['100', '300', '400', '700'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gym',
  description: 'Track all metrics from your gym students.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={roboto.className}>
        <NextAuthSessionProvider>
          {children}
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
