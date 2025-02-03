import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth' // Middleware for authentication
import { BadRequestError } from '@/http/routes/_errors/bad-request-error' // Custom error for bad requests
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error' // Custom error for unauthorized access
import { prisma } from '@/lib/prisma' // Prisma client
import { getUserPermissions } from '@/utils/get-user-permissions' // Utility to get user permissions

export async function getTask(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth) // Register the authentication middleware
    .get(
      '/projects/:projectId/tasks/:taskId',
      {
        schema: {
          tags: ['Tasks'],
          summary: 'Get task details',
          security: [{ bearerAuth: [] }], // Authentication
          params: z.object({
            projectId: z.string().uuid(), // Validate projectId as UUID
            taskId: z.string().uuid(), // Validate taskId as UUID
          }),
          response: {
            200: z.object({
              task: z.object({
                id: z.string(),
                title: z.string(),
                description: z.string().nullable(),
                eta: z.date().nullable(),
                createdAt: z.date(), // ISO date string
                updatedAt: z.date(), // ISO date string
                reporterId: z.string(),
                assigneeId: z.string().nullable(),
                projectId: z.string(),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const { projectId, taskId } = request.params // Extract project and task IDs from request parameters
        const userId = await request.getCurrentUserId() // Get current user ID
        const { organization, membership } =
          await request.getUserMembership(projectId)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('get', 'Project')) {
          throw new UnauthorizedError(`You're not allowed to see this task.`)
        }

        const task = await prisma.task.findUnique({
          select: {
            id: true,
            title: true,
            description: true,
            eta: true,
            createdAt: true,
            updatedAt: true,
            reporterId: true,
            assigneeId: true,
            projectId: true,
          },
          where: {
            id: taskId,
            projectId: projectId, // Ensure the task belongs to the project
          },
        })

        if (!task) {
          throw new BadRequestError('Task not found.')
        }

        return reply.send({ task })
      }
    )
}
