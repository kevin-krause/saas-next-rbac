import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'
import { getInitials } from './profile-button'
import Link from 'next/link'
import { getCurrentOrg } from '@/auth/auth'

dayjs.extend(relativeTime)

export interface Project {
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

interface CardSectionProps {
  projects: Project[]
}

export function CardSection({ projects }: CardSectionProps) {
  const org = getCurrentOrg()
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
      {projects.map((project, index) => (
        <Card key={project.id} className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="truncate text-xl font-medium">
              {project.name}
            </CardTitle>
            <CardDescription className="line-clamp-3 leading-relaxed ">
              {project.description}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex items-center gap-1.5">
            <span className="flex flex-col truncate text-xs text-muted-foreground">
              <div className="flex flex-row">
                <Avatar className="size-4">
                  {project.owner.avatarUrl && (
                    <AvatarImage src={project.owner.avatarUrl} />
                  )}
                  <AvatarFallback className="text-sm">
                    {getInitials(project.owner.name as string)}
                  </AvatarFallback>
                </Avatar>
                <span className="ml-2 truncate font-medium text-foreground">
                  {project.owner.name}
                </span>
              </div>
              {dayjs(project.createdAt).fromNow()}
            </span>
            <Button size="xs" variant="outline" className="ml-6">
              View <ArrowRight className="ml-2 size-3" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
