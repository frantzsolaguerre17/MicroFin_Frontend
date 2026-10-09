
function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <h1 className="text-xl font-bold text-slate-800">
          MicroFin-App
        </h1>
      </header>

      <main className="p-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Tableau de bord
        </h2>

        <p className="mt-2 text-slate-500">
          Bienvenue dans votre espace de gestion de microfinance.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Clients</p>
            <p className="mt-2 text-3xl font-bold text-slate-800">0</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Comptes</p>
            <p className="mt-2 text-3xl font-bold text-slate-800">0</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Prêts</p>
            <p className="mt-2 text-3xl font-bold text-slate-800">0</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default DashboardPage