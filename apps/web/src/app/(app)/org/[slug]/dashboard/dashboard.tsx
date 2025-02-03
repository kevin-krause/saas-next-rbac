import { CardSection } from '@/components/card-section'
import DataTable from '@/components/server/data-table'
import { getProjects } from '@/http/get-projects'
import { getCurrentOrg } from '@/auth/auth'
import React from 'react'

export default async function DashboardView() {
  const org = getCurrentOrg()
  const projectList = await getProjects(org!)
  const { projects } = projectList

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-6">
      <CardSection projects={projects} />
      <div className="mt-8">
        <DataTable projects={projects} />
      </div>
    </div>
  )
}
