import { Project } from '@/components/card-section'
import ClientTable from '@/components/client/client-table'

interface DataTableProps {
  projects: Project[]
}

export default function DataTable({ projects }: DataTableProps) {
  return (
    <div className="w-full">
      <ClientTable projects={projects} />
    </div>
  )
}
