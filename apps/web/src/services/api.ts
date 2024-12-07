// src/services/api.ts
import {
  DiariosResponse,
  LegislacaoResponse,
  ProcessosResponse,
  JurisprudenciaResponse,
} from './types'

export async function fetchDiarios(
  query: string = ''
): Promise<DiariosResponse> {
  const response = await fetch(
    `https://api.jusbrasil.com/diarios?query=${encodeURIComponent(query)}`
  )
  if (!response.ok) throw new Error('Erro ao buscar diários')
  return response.json()
}

export async function fetchLegislacao(
  query: string = ''
): Promise<LegislacaoResponse> {
  const response = await fetch(
    `https://api.lexml.gov.br/legislacao?query=${encodeURIComponent(query)}`
  )
  if (!response.ok) throw new Error('Erro ao buscar legislação')
  return response.json()
}

export async function fetchProcessos(
  numero: string = ''
): Promise<ProcessosResponse> {
  const response = await fetch(
    `https://api.cnj.jus.br/processos?numero=${encodeURIComponent(numero)}`
  )
  if (!response.ok) throw new Error('Erro ao buscar processos')
  return response.json()
}

export async function fetchJurisprudencia(
  query: string = ''
): Promise<JurisprudenciaResponse> {
  const response = await fetch(
    `https://api.jusbrasil.com/jurisprudencia?query=${encodeURIComponent(query)}`
  )
  if (!response.ok) throw new Error('Erro ao buscar jurisprudência')
  return response.json()
}
