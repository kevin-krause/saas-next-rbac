import { Slash } from 'lucide-react'
import Image from 'next/image'
import rocketseatIcon from '@/assets/rocketseat-icon.svg'
import { ability, getCurrentOrg } from '@/auth/auth'
import { OrganizationSwitcher } from './organization-switcher'
import { PendingInvites } from './pending-invites'
import { ProfileButton } from './profile-button'
import { ProjectSwitcher } from './project-switcher'
import { ThemeSwitcher } from './theme/theme-switcher'
import { Separator } from './ui/separator'
// import Link from 'next/link'
import { SidebarTrigger } from './ui/sidebar'

export async function Header() {
  const permissions = await ability()
  const org = getCurrentOrg()

  return (
    <div className="mx-auto flex max-w-full items-center justify-between bg-white px-6 py-4 shadow-md dark:bg-black">
      <div className="flex items-center gap-3">
        {/* <Link href="/">
          <Image
            src={rocketseatIcon}
            className="size-6 dark:invert"
            alt="Rocketseat"
          />
        </Link> */}
        <SidebarTrigger />
        <Slash className="size-3 -rotate-[24deg] text-border" />

        <nav className="flex items-center gap-6 text-sm font-medium text-zinc-500 dark:text-gray-300">
          <a href="/" className="hover:text-zinc-700 dark:hover:text-zinc-100">
            Gestão
          </a>
          <a href="/" className="hover:text-zinc-700 dark:hover:text-zinc-100">
            Atividades
          </a>
          <a href="/" className="hover:text-zinc-700 dark:hover:text-zinc-100">
            Processos
          </a>
          <a href="/" className="hover:text-zinc-700 dark:hover:text-zinc-100">
            Financeiro
          </a>
          <a href="/" className="hover:text-zinc-700 dark:hover:text-zinc-100">
            Documentos
          </a>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {org && <OrganizationSwitcher />}
        {permissions?.can('get', 'Project') && (
          <>
            <Slash className="size-3 -rotate-[24deg] text-border" />
            <ProjectSwitcher />
          </>
        )}
        <PendingInvites />
        <ThemeSwitcher />
        <Separator orientation="vertical" className="h-5" />
        <ProfileButton />
      </div>
    </div>
  )
}
