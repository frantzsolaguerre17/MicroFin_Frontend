
type HeaderProps = {
  title: string
}

function Header({ title }: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <div>
        <h2 className="text-xl font-semibold text-slate-800">
          {title}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Bienvenue dans votre espace de gestion.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-slate-800">
            Administrateur
          </p>
          <p className="text-xs text-slate-500">
            MicroFin-App
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
          A
        </div>
      </div>
    </header>
  )
}

export default Header