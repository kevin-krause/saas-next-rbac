'use client'
import React, { useState, useEffect } from 'react'
import { fetchLegislacao } from '../services/api'
import { Norma } from '../services/types'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Button } from '@/components/ui/button'
import { Input } from './ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card'
import { CircleHelp } from 'lucide-react'

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
})

const LegislacaoCard: React.FC = () => {
  const [query, setQuery] = useState<string>('')
  const [data, setData] = useState<Norma[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (query.trim() !== '') {
      setLoading(true)
      fetchLegislacao(query)
        .then((result) => {
          setData(result.normas || [])
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false))
    }
  }, [query])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setQuery(values.username)
    console.log('Form Values:', values)
  }

  return (
    <Card className="p-2">
      <CardDescription className="line-clamp-3 px-6 py-4 leading-relaxed">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, (errors) => {
              console.error('Form Errors:', errors)
            })}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <FormLabel className="text-white">Legislação</FormLabel>
                    <HoverCard>
                      <HoverCardTrigger className="hover:text-white">
                        <CircleHelp />
                      </HoverCardTrigger>
                      <HoverCardContent>
                        The React Framework – created and maintained by @vercel.
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                  <FormDescription>
                    Powered by LexML Brasil.
                    {loading && <p>Carregando</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <p>
                      <ul>
                        {data.map((norma, index) => (
                          <li key={index}>
                            <strong>{norma.titulo}</strong> -
                            {norma.dataPublicacao}
                          </li>
                        ))}
                      </ul>
                    </p>
                  </FormDescription>
                  <FormControl>
                    <Input
                      placeholder="Ex: crime fiscalização meio ambiente"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Buscar</Button>
          </form>
        </Form>
      </CardDescription>
    </Card>
  )
}

export default LegislacaoCard
