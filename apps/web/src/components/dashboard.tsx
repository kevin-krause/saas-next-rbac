import React from 'react'
import DiariosCard from './diarios-card'
import LegislacaoCard from './legislacao-card'
import ProcessosCard from './processos-card'
import JurisprudenciaCard from './jurisprudencia-card'

const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-flow-col grid-rows-3 gap-4">
      <div className="row-span-3">
        <DiariosCard />
      </div>
      <div className="col-span-2 space-y-4">
        <LegislacaoCard />
        <JurisprudenciaCard />
      </div>
      <div className="col-span-2 row-span-2">
        <ProcessosCard />
      </div>
    </div>
  )
}

export default Dashboard
