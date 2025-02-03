import './globals.css'
import type { Metadata } from 'next'
import { Providers } from './providers'
import AppSidebar from '@/components/app-sidebar'
import { cookies } from 'next/headers'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export const metadata: Metadata = {
  title: 'Create Next App',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true'

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SidebarProvider defaultOpen={defaultOpen}>
          <Providers>{children}</Providers>
        </SidebarProvider>
      </body>
    </html>
  )
}
