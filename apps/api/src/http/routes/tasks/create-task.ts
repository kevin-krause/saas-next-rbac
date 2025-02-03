import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth' // Middleware for authentication
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error' // Custom error for unauthorized access
import { prisma } from '@/lib/prisma' // Prisma client
import { getUserPermissions } from '@/utils/get-user-permissions' // Utility to get user permissions

export async function createTask(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth) // Register the authentication middleware
    .post(
      '/projects/:projectId/tasks',
      {
        schema: {
          tags: ['Tasks'],
          summary: 'Create a new task',
          security: [{ bearerAuth: [] }], // Authentication
          body: z.object({
            title: z.string(),
            description: z.string().optional(),
            eta: z
              .string()
              .optional()
              .refine((val) => !val || !isNaN(Date.parse(val)), {
                message: 'Invalid date format',
              }), // Validate ETA as an optional date string
            assigneeId: z.string().optional(), // Optional assignee ID
          }),
          params: z.object({
            projectId: z.string().uuid(), // Validate projectId as UUID
          }),
          response: {
            201: z.object({
              taskId: z.string().uuid(), // Response schema for successful creation
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

        const { title, description, eta, assigneeId } = request.body

        const task = await prisma.task.create({
          data: {
            title,
            description,
            eta: eta ? new Date(eta) : null, // Convert ETA to Date object
            projectId,
            reporterId: userId, // Set the current user as the reporter
            assigneeId, // Optional: Assign the task to a user if provided
          },
        })

        return reply.status(201).send({
          taskId: task.id, // Respond with the created task ID
        })
      }
    )
}
