import { getCurrentOrg } from '@/auth/auth'
import { getProject } from '@/http/get-project'
import { GetProjectResponse } from '@/http/get-project'
import { getProjects } from '@/http/get-projects'

interface ProjectProps {
  params: {
    projectSlug: string
  }
}

export default async function Projects({ params }: ProjectProps) {
  const org = await getCurrentOrg()
  const { projectSlug } = params
  const { project } = await getProject(org as string, projectSlug)
  // const { name, createdAt, description, owner, slug } = projectInfo
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{project.name}</h1>
      {JSON.stringify(project)}
    </div>
  )
}
