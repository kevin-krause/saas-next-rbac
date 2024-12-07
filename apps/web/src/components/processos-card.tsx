'use client'
import React, { useState } from 'react'
import { fetchProcessos } from '../services/api'
import { Processo } from '../services/types'
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
import { ArrowRightCircleIcon, CircleHelp } from 'lucide-react'

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
})

const ProcessosCard: React.FC = () => {
  const [numero, setNumero] = useState<string>('')
  const [data, setData] = useState<Processo | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  function handleSearch() {
    if (numero.trim() !== '') {
      setLoading(true)
      fetchProcessos(numero)
        .then((result) => {
          setData(result.processo)
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false))
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setNumero(values.username)
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
                  <div className="flex items-center space-x-2">
                    <FormLabel className="text-white">
                      Consulta Processual (CNJ)
                    </FormLabel>
                  </div>
                  <FormDescription>
                    {loading && <p>Carregando</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <p>
                      <ul>
                        {loading && <p>Carregando...</p>}
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {data && (
                          <div>
                            <h3>Detalhes do Processo:</h3>
                            <p>
                              <strong>Número:</strong> {data.numero}
                            </p>
                            <p>
                              <strong>Assunto:</strong> {data.assunto}
                            </p>
                            <p>
                              <strong>Data de distribuição:</strong>{' '}
                              {data.dataDistribuicao}
                            </p>
                          </div>
                        )}
                      </ul>
                    </p>
                  </FormDescription>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Input placeholder="Número do processo" {...field} />
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

export default ProcessosCard
