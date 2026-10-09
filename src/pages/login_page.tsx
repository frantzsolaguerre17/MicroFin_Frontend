
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const navigate = useNavigate()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // Navigation temporaire : aucune authentification réelle.
    navigate('/dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800">
            MicroFin-App
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Gestion de microfinance
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-slate-800">
          Connexion
        </h2>
        <p className="mb-6 mt-2 text-sm text-slate-500">
          Connectez-vous à votre espace de travail.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
              Adresse e-mail
            </label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              placeholder="nom@microfin.com"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Entrez votre mot de passe"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white transition hover:bg-blue-800"
          >
            Se connecter
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-slate-400">
          © 2026 MicroFin-App — Tous droits réservés
        </p>
      </div>
    </div>
  )
}

export default LoginPage