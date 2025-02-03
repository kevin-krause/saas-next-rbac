import { Header } from '@/components/header'
import Home from './home/page'
import { getCurrentOrg } from '@/auth/auth'
import AppSidebar from '@/components/app-sidebar'
import { SidebarTrigger } from '@/components/ui/sidebar'

export default async function HomeView() {
  const org = getCurrentOrg()
  return (
    <>
      <Header />
      <div className="space-y-4 py-2">
        <main className="mx-auto w-full max-w-[1200px] space-y-4">
          <Home />
        </main>
        <AppSidebar org={org} />
      </div>
    </>
  )
}
