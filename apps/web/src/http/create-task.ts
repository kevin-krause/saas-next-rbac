import { api } from './api-client'

interface CreateTask {
  title: string
  description: string
  eta: Date
  createdAt: Date // ISO date string
  updatedAt: Date // ISO date string
  reporterId: string
  assigneeId: string
  projectId: string
}

type CreateInviteResponse = void

export async function createTask({
  title,
  description,
  eta,
  createdAt,
  updatedAt,
  reporterId,
  assigneeId,
  projectId,
}: CreateTask): Promise<CreateInviteResponse> {
  await api.post(`/projects/${projectId}/tasks`, {
    json: {
      title,
      description,
      eta,
      createdAt,
      updatedAt,
      reporterId,
      assigneeId,
      projectId,
    },
  })
}
