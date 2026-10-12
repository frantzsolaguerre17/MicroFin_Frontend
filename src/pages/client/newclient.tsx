
import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'

import DashboardLayout from '../../layouts/dashboardlayout'
import {
  createClient,
  getClient,
  updateClient,
} from '../../services/api'
import type { Client } from '../../types/client'

type ClientFormData = {
  code: string
  nom: string
  prenom: string
  sexe: string
  date_naissance: string
  telephone: string
  email: string
  adresse: string
  profession: string
  employeur: string
  salaire_mensuel: string
  date_adhesion: string
  type_piece_identite: string
  numero_piece_identite: string
  succursale_id: string
  statut: string
}

const initialForm: ClientFormData = {
  code: '',
  nom: '',
  prenom: '',
  sexe: '',
  date_naissance: '',
  telephone: '',
  email: '',
  adresse: '',
  profession: '',
  employeur: '',
  salaire_mensuel: '',
  date_adhesion: '',
  type_piece_identite: '',
  numero_piece_identite: '',
  succursale_id: '',
  statut: 'ACTIF',
}

function ClientFormPage() {
  const navigate = useNavigate()
  const { clientId } = useParams<{ clientId: string }>()
  const isEditing = Boolean(clientId)

  const [form, setForm] = useState<ClientFormData>(initialForm)
  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!clientId) return

    let ignore = false

    async function loadClient() {
      try {
        const client: Client = await getClient(Number(clientId))

        if (ignore) return

        setForm({
          code: client.code ?? '',
          nom: client.nom ?? '',
          prenom: client.prenom ?? '',
          sexe: client.sexe ?? '',
          date_naissance: client.date_naissance?.slice(0, 10) ?? '',
          telephone: client.telephone ?? '',
          email: client.email ?? '',
          adresse: client.adresse ?? '',
          profession: client.profession ?? '',
          employeur: client.employeur ?? '',
          salaire_mensuel: client.salaire_mensuel != null
            ? String(client.salaire_mensuel)
            : '',
          date_adhesion: client.date_adhesion?.slice(0, 10) ?? '',
          type_piece_identite: client.type_piece_identite ?? '',
          numero_piece_identite: client.numero_piece_identite ?? '',
          succursale_id: client.succursale_id != null
            ? String(client.succursale_id)
            : '',
          statut: client.statut ?? 'ACTIF',
        })
      } catch (err) {
        if (!ignore) {
          setError(
            err instanceof Error
              ? err.message
              : 'Impossible de charger ce client.',
          )
        }
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    void loadClient()

    return () => {
      ignore = true
    }
  }, [clientId])

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value } = event.target

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setError('')

    const payload: Record<string, unknown> = {
      code: form.code.trim(),
      nom: form.nom.trim(),
      prenom: form.prenom.trim(),
      sexe: form.sexe,
      date_naissance: form.date_naissance || null,
      telephone: form.telephone.trim(),
      email: form.email.trim() || null,
      adresse: form.adresse.trim() || null,
      profession: form.profession.trim() || null,
      employeur: form.employeur.trim() || null,
      salaire_mensuel: form.salaire_mensuel
        ? Number(form.salaire_mensuel)
        : null,
      date_adhesion: form.date_adhesion || null,
      type_piece_identite: form.type_piece_identite || null,
      numero_piece_identite: form.numero_piece_identite.trim() || null,
      succursale_id: form.succursale_id
        ? Number(form.succursale_id)
        : null,
      statut: form.statut,
    }

    try {
      if (isEditing) {
        await updateClient(Number(clientId), payload)
      } else {
        await createClient(payload)
      }

      navigate('/clients')
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Une erreur est survenue lors de l’enregistrement.',
      )
    } finally {
      setSaving(false)
    }
  }

  const fields: {
    name: keyof ClientFormData
    label: string
    type?: string
    required?: boolean
  }[] = [
    { name: 'code', label: 'Code client', required: true },
    { name: 'nom', label: 'Nom', required: true },
    { name: 'prenom', label: 'Prénom', required: true },
    { name: 'date_naissance', label: 'Date de naissance', type: 'date' },
    { name: 'telephone', label: 'Téléphone', required: true },
    { name: 'email', label: 'E-mail', type: 'email' },
    { name: 'adresse', label: 'Adresse' },
    { name: 'profession', label: 'Profession' },
    { name: 'employeur', label: 'Employeur' },
    {
      name: 'salaire_mensuel',
      label: 'Salaire mensuel (HTG)',
      type: 'number',
    },
    { name: 'date_adhesion', label: 'Date d’adhésion', type: 'date' },
    { name: 'type_piece_identite', label: 'Type de pièce d’identité' },
    { name: 'numero_piece_identite', label: 'Numéro de pièce' },
    {
      name: 'succursale_id',
      label: 'ID de la succursale',
      type: 'number',
    },
  ]

  return (
    <DashboardLayout
      title={isEditing ? 'Modifier un client' : 'Nouveau client'}
    >
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {isEditing ? 'Modifier le client' : 'Enregistrer un client'}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {isEditing
                ? 'Mets à jour les informations du client.'
                : 'Remplis les informations pour créer un nouveau client.'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/clients')}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <ArrowLeft size={16} />
            Retour aux clients
          </button>
        </div>

        {loading ? (
          <div className="rounded-xl border bg-white p-8 text-center text-slate-500">
            Chargement du client...
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            {error && (
              <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {fields.map((field) => (
                <div key={field.name} className="space-y-1.5">
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-slate-700"
                  >
                    {field.label}
                    {field.required && (
                      <span className="ml-1 text-red-500">*</span>
                    )}
                  </label>

                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type ?? 'text'}
                    value={form[field.name]}
                    onChange={handleChange}
                    required={field.required}
                    min={field.type === 'number' ? 0 : undefined}
                    step={
                      field.name === 'salaire_mensuel'
                        ? '0.01'
                        : undefined
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                  />
                </div>
              ))}

              <div className="space-y-1.5">
                <label
                  htmlFor="sexe"
                  className="block text-sm font-medium text-slate-700"
                >
                  Sexe <span className="text-red-500">*</span>
                </label>

                <select
                  id="sexe"
                  name="sexe"
                  value={form.sexe}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                >
                  <option value="">Sélectionner</option>
                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
                  <option value="AUTRE">Autre</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="statut"
                  className="block text-sm font-medium text-slate-700"
                >
                  Statut
                </label>

                <select
                  id="statut"
                  name="statut"
                  value={form.statut}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                >
                  <option value="ACTIF">Actif</option>
                  <option value="INACTIF">Inactif</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-3 border-t border-slate-100 pt-5">
              <button
                type="button"
                onClick={() => navigate('/clients')}
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Annuler
              </button>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save size={16} />
                {saving
                  ? 'Enregistrement...'
                  : isEditing
                    ? 'Enregistrer les modifications'
                    : 'Enregistrer le client'}
              </button>
            </div>
          </form>
        )}
      </div>
    </DashboardLayout>
  )
}

export default ClientFormPage