import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'Teamsphere',
  description: 'All your communication needs in one place',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
          <main>{children}</main>
          <Toaster position="top-center" />
      </body>
    </html>
  );
}
