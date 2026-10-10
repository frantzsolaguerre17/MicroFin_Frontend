
import DashboardLayout from '../layouts/dashboardlayout'

const statistics = [
  { label: 'Total clients', value: '0', description: 'Clients enregistrés' },
  { label: 'Comptes actifs', value: '0', description: 'Comptes ouverts' },
  { label: 'Prêts en cours', value: '0', description: 'Prêts à suivre' },
]

function DashboardPage() {
  return (
    <DashboardLayout title="Tableau de bord">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-800">
          Vue d'ensemble
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Voici un aperçu de votre activité.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {statistics.map((statistic) => (
          <div
            key={statistic.label}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-medium text-slate-500">
              {statistic.label}
            </p>

            <p className="mt-3 text-3xl font-bold text-slate-800">
              {statistic.value}
            </p>

            <p className="mt-2 text-sm text-slate-400">
              {statistic.description}
            </p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}

export default DashboardPage