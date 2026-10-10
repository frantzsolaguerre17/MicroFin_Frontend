import type { ReactNode } from 'react'

import Header from '../components/layout/header'
import Sidebar from '../components/layout/sidebar'

type DashboardLayoutProps = {
  children: ReactNode
  title: string
}

function DashboardLayout({
  children,
  title,
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">

      {/* Sidebar : fixe, avec son propre défilement */}
      <aside className="fixed inset-y-0 left-0 z-40 w-64 overflow-y-auto">
        <Sidebar />
      </aside>

      {/* Application à droite du sidebar */}
      <div className="ml-64 flex h-screen min-w-0 flex-1 flex-col overflow-hidden">

        {/* Header : toujours visible */}
        <header className="z-30 shrink-0">
          <Header title={title} />
        </header>

        {/* Seule la page principale défile indépendamment */}
        <main className="min-h-0 flex-1 overflow-y-auto p-6">
          {children}
        </main>

      </div>
    </div>
  )
}

export default DashboardLayout

