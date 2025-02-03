// src/services/api.ts
export interface DiarioItem {
  titulo: string
  link: string
  data: string
}

export interface DiariosResponse {
  items: DiarioItem[]
}

export interface Norma {
  titulo: string
  dataPublicacao: string
}

export interface LegislacaoResponse {
  normas: Norma[]
}

export interface Processo {
  numero: string
  assunto: string
  dataDistribuicao: string
}

export interface ProcessosResponse {
  processo: Processo
}

export interface JurisprudenciaItem {
  titulo: string
  ementa: string
}

export interface JurisprudenciaResponse {
  jurisprudencia: JurisprudenciaItem[]
}
