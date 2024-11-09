import { Plus } from 'lucide-react'
import Link from 'next/link'

import { ability, getCurrentOrg } from '@/auth/auth'
import { Button } from '@/components/ui/button'

import DashboardView from '@/app/(app)/org/[slug]/dashboard/dashboard'

export default async function Projects() {
  const currentOrg = getCurrentOrg()
  const permissions = await ability()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between"></div>

      {permissions?.can('get', 'Project') ? (
        <DashboardView />
      ) : (
        <p className="text-sm text-muted-foreground">
          You are not allowed to see organization projects.
        </p>
      )}
    </div>
  )
}
