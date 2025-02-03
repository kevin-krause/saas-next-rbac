import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth' // Middleware for authentication
import { BadRequestError } from '@/http/routes/_errors/bad-request-error' // Custom error for bad requests
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error' // Custom error for unauthorized access
import { prisma } from '@/lib/prisma' // Prisma client
import { getUserPermissions } from '@/utils/get-user-permissions' // Utility to get user permissions

interface IOptional {
  assigneeId: string
  reporterId: string
}

export async function getTasks(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth) // Register the authentication middleware
    .get(
      '/projects/:projectId/tasks',
      {
        schema: {
          tags: ['Tasks'],
          summary: 'Get all tasks for a project',
          security: [{ bearerAuth: [] }], // Authentication
          params: z.object({
            projectId: z.string().uuid(), // Validate projectId as UUID
          }),
          query: z.object({
            assigneeId: z.string().optional(), // Optional query parameter for assignee
            reporterId: z.string().optional(), // Optional query parameter for reporter
          }),
          response: {
            200: z.object({
              tasks: z.array(
                z.object({
                  id: z.string(),
                  title: z.string(),
                  description: z.string().nullable(),
                  eta: z.date().nullable(),
                  createdAt: z.date(), // ISO date string
                  updatedAt: z.date(), // ISO date string
                  reporterId: z.string(),
                  assigneeId: z.string().nullable(),
                  projectId: z.string(),
                })
              ),
            }),
          },
        },
      },
      async (request, reply) => {
        const { projectId } = request.params // Extract project ID from request parameters
        const userId = await request.getCurrentUserId() // Get current user ID
        const { organization, membership } =
          await request.getUserMembership(projectId)

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('create', 'Project')) {
          throw new UnauthorizedError(`You're not allowed to create new tasks.`)
        }

        const { assigneeId, reporterId } = request.query as IOptional // Extract optional query parameters

        const where: any = {
          projectId: projectId, // Ensure tasks belong to the specified project
        }

        // Apply filtering based on optional query parameters
        if (assigneeId) {
          where.assigneeId = assigneeId
        }

        if (reporterId) {
          where.reporterId = reporterId
        }

        const tasks = await prisma.task.findMany({
          where,
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
        })

        return reply.send({ tasks }) // Return the list of tasks
      }
    )
}
