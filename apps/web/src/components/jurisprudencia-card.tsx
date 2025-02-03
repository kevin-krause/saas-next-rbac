'use client'
import React, { useState, useEffect } from 'react'
import { fetchJurisprudencia } from '../services/api'
import { JurisprudenciaItem } from '../services/types'
import { Card, CardDescription } from './ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card'
import { ArrowLeftIcon, ArrowRightCircleIcon, CircleHelp } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
})

const JurisprudenciaCard: React.FC = () => {
  const [query, setQuery] = useState<string>('')
  const [data, setData] = useState<JurisprudenciaItem[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (query.trim() !== '') {
      setLoading(true)
      fetchJurisprudencia(query)
        .then((result) => {
          setData(result.jurisprudencia || [])
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
    <Card className="p-0">
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
                  <FormDescription>
                    {loading && <p>Carregando</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <p>
                      <ul>
                        {data.map((decisao, index) => (
                          <li key={index}>
                            <strong>{decisao.titulo}</strong> - {decisao.ementa}
                          </li>
                        ))}
                      </ul>
                    </p>
                  </FormDescription>
                  <FormLabel className="text-white">Jurisprudência</FormLabel>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Input placeholder="Ex: codigo civil" {...field} />
                    </FormControl>
                    <div className="">
                      <Button type="submit">
                        <ArrowRightCircleIcon />
                      </Button>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardDescription>
    </Card>
  )
}

export default JurisprudenciaCard
