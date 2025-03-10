import { api } from './api-client'

export interface GetProjectResponse {
  project: {
    description: string
    slug: string
    id: string
    name: string
    avatarUrl: string | null
    organizationId: string
    ownerId: string
    createdAt: string
    owner: {
      id: string
      name: string | null
      avatarUrl: string | null
    }
  }
}

export async function getProject(orgSlug: string, projectSlug: string) {
  if (!orgSlug) {
    throw new Error('Organization slug is required')
  }

  const result = await api
    .get(`organizations/${orgSlug}/projects/${projectSlug}/`)
    .json<GetProjectResponse>()

  return result
}
