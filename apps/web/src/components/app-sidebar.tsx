interface AppSidebarProps {}

import { OrganizationSwitcher } from '@/components/organization-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { AlertCircleIcon, SidebarClose } from 'lucide-react'
import { Alert, AlertDescription } from './ui/alert'

interface AppSidebarProps {
  org: string | null
}

export default async function AppSidebar({ org }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="mt-2 min-w-fit flex-row justify-between">
        {!org && <OrganizationSwitcher />} <SidebarTrigger />{' '}
      </SidebarHeader>
      <Alert>
        <AlertCircleIcon />
        <AlertDescription>
          use 'crt-b' to open and close your sidebar.
        </AlertDescription>
      </Alert>
      <SidebarContent>
        <SidebarGroup>{/* <MemberList /> */}</SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="text-sm font-semibold ">
        Powered by AdvWise
      </SidebarFooter>
    </Sidebar>
  )
}
