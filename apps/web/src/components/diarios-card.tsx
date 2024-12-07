'use client'
import React, { useState, useEffect } from 'react'
import { fetchDiarios } from '../services/api'
import { DiarioItem } from '../services/types'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
})

const DiariosCard: React.FC = () => {
  const [query, setQuery] = useState<string>('')
  const [data, setData] = useState<DiarioItem[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (query.trim() !== '') {
      setLoading(true)
      fetchDiarios(query)
        .then((result) => {
          setData(result.items || [])
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
      <CardHeader>
        <CardTitle>Diários Oficiais</CardTitle>
      </CardHeader>
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
                  <FormLabel className="text-white">Palavra Chave</FormLabel>
                  <FormDescription>
                    Jornal oficial de órgãos públicos municipais, estaduais e do
                    Governo Federal
                    {loading && <p>Carregando</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <p>
                      <ul>
                        {data.map((item, index) => (
                          <li key={index}>
                            <a href={item.link}>{item.titulo}</a> - {item.data}
                          </li>
                        ))}
                      </ul>
                    </p>
                  </FormDescription>
                  <FormControl>
                    <Input placeholder="Buscar por palavra-chave" {...field} />
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

export default DiariosCard
