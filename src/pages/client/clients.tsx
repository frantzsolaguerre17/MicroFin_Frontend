import { useEffect, useState } from 'react'
import { Pencil, RefreshCw, Search, Users } from 'lucide-react'

import DashboardLayout from '../../layouts/dashboardlayout'
import { getClients } from '../../services/api'
import type { Client } from '../../types/client'
import { useNavigate } from 'react-router-dom'

function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const pageSize = 25
  const navigate = useNavigate()

  // Charger les clients depuis le backend
  async function loadClients() {
    setLoading(true)
    setError('')

    try {
      const data: Client[] = await getClients()
      setClients(data)
      setCurrentPage(1)
    } catch (error) {
      console.error('Erreur lors du chargement des clients :', error)

      setError(
        error instanceof Error
          ? error.message
          : 'Impossible de charger les clients.'
      )
    } finally {
      setLoading(false)
    }
  }

  // Chargement initial
  useEffect(() => {
    let ignore = false

    async function fetchClients() {
      try {
        const data: Client[] = await getClients()

        if (!ignore) {
          setClients(data)
          setError('')
        }
      } catch (error) {
        console.error(
          'Erreur lors du chargement des clients :',
          error
        )

        if (!ignore) {
          setError(
            error instanceof Error
              ? error.message
              : 'Impossible de charger les clients.'
          )
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    void fetchClients()

    return () => {
      ignore = true
    }
  }, [])

  // Recherche parmi les clients chargés
  const searchText = search.trim().toLowerCase()

  const filteredClients = clients.filter((client) => {
    return [
      client.code,
      client.nom,
      client.prenom,
      client.telephone,
      client.email ?? '',
      client.adresse ?? '',
      client.profession ?? '',
      client.employeur ?? '',
    ].some((value) =>
      String(value ?? '').toLowerCase().includes(searchText)
    )
  })

  // Pagination
  const totalPages = Math.max(
    1,
    Math.ceil(filteredClients.length / pageSize)
  )

  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  return (
    <DashboardLayout title="Gestion des clients">
      <div className="space-y-6">
        {/* Titre et bouton Actualiser */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Clients
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Consulte et recherche les clients enregistrés.
            </p>
          </div>

      
{/* Boutons Nouveau et Actualiser */}
<div className="flex flex-wrap items-center gap-3">
  <button
    type="button"
    onClick={() => navigate('/clients/nouveau')}
    className="inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-purple-700"
  >
    <Users size={16} />
    Nouveau
  </button>

  <button
    type="button"
    onClick={() => void loadClients()}
    disabled={loading}
    className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
  >
    <RefreshCw
      size={16}
      className={loading ? 'animate-spin' : ''}
    />
    Actualiser
  </button>
</div>

        </div>

        {/* Résumé */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-purple-100 p-3 text-purple-700">
              <Users size={24} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Total des clients
              </p>

              <p className="text-2xl font-bold text-slate-800">
                {clients.length}
              </p>
            </div>
          </div>
        </div>

        {/* Tableau des clients */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {/* Barre de recherche */}
          <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-semibold text-slate-800">
                Liste des clients
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                {filteredClients.length} résultat(s)
              </p>
            </div>

            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value)
                  setCurrentPage(1)
                }}
                placeholder="Rechercher un client..."
                className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 sm:w-72"
              />
            </div>
          </div>

          {/* Message d'erreur */}
          {error && (
            <div className="m-4 rounded-lg bg-red-50 p-4 text-sm text-red-700">
              <p>{error}</p>

              <button
                type="button"
                onClick={() => void loadClients()}
                className="mt-2 font-semibold underline"
              >
                Réessayer
              </button>
            </div>
          )}

          {/* Zone avec défilement indépendant */}
          <div className="max-h-[65vh] overflow-auto">
            <table className="w-full min-w-[1500px] table-fixed border-collapse text-left text-sm">
              {/* En-tête fixe pendant le défilement vertical */}
              <thead className="sticky top-0 z-10 bg-slate-100 text-xs uppercase text-slate-600 shadow-sm">
                <tr>
                  <th className="w-28 px-4 py-4">Code</th>
                  <th className="w-48 px-4 py-4">Nom complet</th>
                  <th className="w-24 px-4 py-4">Sexe</th>
                  <th className="w-36 px-4 py-4">Date naissance</th>
                  <th className="w-36 px-4 py-4">Téléphone</th>
                  <th className="w-56 px-4 py-4">E-mail</th>
                  <th className="w-52 px-4 py-4">Adresse</th>
                  <th className="w-40 px-4 py-4">Profession</th>
                  <th className="w-40 px-4 py-4">Employeur</th>
                  <th className="w-36 px-4 py-4">Salaire mensuel</th>
                  <th className="w-36 px-4 py-4">Date Adhesion</th>
                  <th className="w-36 px-4 py-4">Type Piece</th>
                  <th className="w-36 px-4 py-4">Numero Piece</th>
                  <th className="w-32 px-4 py-4">Succursale</th>
                  <th className="w-28 px-4 py-4">Statut</th>
                  <th className="w-32 px-4 py-4">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan={12}
                      className="px-5 py-10 text-center text-slate-500"
                    >
                      Chargement des clients...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td
                      colSpan={12}
                      className="px-5 py-10 text-center text-slate-500"
                    >
                      Les données ne sont pas disponibles.
                    </td>
                  </tr>
                ) : paginatedClients.length === 0 ? (
                  <tr>
                    <td
                      colSpan={12}
                      className="px-5 py-10 text-center text-slate-500"
                    >
                      Aucun client trouvé.
                    </td>
                  </tr>
                ) : (
                  paginatedClients.map((client) => (
                    <tr
                      key={client.id}
                      className="transition-colors hover:bg-purple-50/50"
                    >
                      <td
                        className="truncate whitespace-nowrap px-4 py-4 font-medium text-purple-700"
                        title={client.code}
                      >
                        {client.code}
                      </td>

                      <td
                        className="truncate whitespace-nowrap px-4 py-4 font-medium text-slate-800"
                        title={`${client.nom} ${client.prenom}`}
                      >
                        {client.nom} {client.prenom}
                      </td>

                      <td className="truncate whitespace-nowrap px-4 py-4 text-slate-600">
                        {client.sexe || '—'}
                      </td>

                      <td className="truncate whitespace-nowrap px-4 py-4 text-slate-600">
                        {client.date_naissance || '—'}
                      </td>

                      <td className="truncate whitespace-nowrap px-4 py-4 text-slate-600">
                        {client.telephone || '—'}
                      </td>

                      <td
                        className="truncate px-4 py-4 text-slate-600"
                        title={client.email ?? ''}
                      >
                        {client.email || '—'}
                      </td>

                      <td
                        className="truncate px-4 py-4 text-slate-600"
                        title={client.adresse ?? ''}
                      >
                        {client.adresse || '—'}
                      </td>

                      <td
                        className="truncate px-4 py-4 text-slate-600"
                        title={client.profession ?? ''}
                      >
                        {client.profession || '—'}
                      </td>

                      <td
                        className="truncate px-4 py-4 text-slate-600"
                        title={client.employeur ?? ''}
                      >
                        {client.employeur || '—'}
                      </td>

                      <td className="truncate whitespace-nowrap px-4 py-4 text-slate-600">
                        {client.salaire_mensuel != null
                          ? client.salaire_mensuel + "HTG"
                          : '—'}
                      </td>

                       <td className="truncate whitespace-nowrap px-4 py-4 text-slate-600">
                        {client.date_adhesion || '-'}
                      </td>

                       <td className="truncate whitespace-nowrap px-4 py-4 text-slate-600">
                        {client.type_piece_identite != null
                        ? client.type_piece_identite
                        : '-'
                        }
                      </td>

                       <td className="truncate whitespace-nowrap px-4 py-4 text-slate-600">
                        {client.numero_piece_identite != null
                        ? client.numero_piece_identite
                        : '-'
                        }
                      </td>

                      <td className="truncate whitespace-nowrap px-4 py-4 text-slate-600">
                        {client.succursale_id ?? '—'}
                      </td>

                      <td className="truncate px-4 py-4">
                        <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                          {client.statut || '—'}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
  <button
    type="button"
    onClick={() =>
      navigate(`/clients/${client.id}/modifier`)
    }
    className="inline-flex items-center gap-2 rounded-lg border border-purple-200 bg-purple-50 px-3 py-2 text-sm font-medium text-purple-700 transition hover:bg-purple-100"
    title={`Modifier ${client.nom} ${client.prenom}`}
  >
    <Pencil size={15} />
    Modifier
  </button>
</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && !error && (
            <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                {filteredClients.length === 0
                  ? 'Aucun client'
                  : `Affichage de ${
                      (currentPage - 1) * pageSize + 1
                    } à ${Math.min(
                      currentPage * pageSize,
                      filteredClients.length
                    )} sur ${filteredClients.length} client(s)`}
              </p>

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.max(1, page - 1)
                    )
                  }
                  disabled={currentPage === 1}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Précédent
                </button>

                <span className="whitespace-nowrap text-sm text-slate-600">
                  Page {currentPage} / {totalPages}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.min(totalPages, page + 1)
                    )
                  }
                  disabled={currentPage >= totalPages}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Suivant
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ClientsPage

