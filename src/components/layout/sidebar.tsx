import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Wallet,
  PiggyBank,
  HandCoins,
  ArrowLeftRight,
  UserCog,
  ClipboardList,
  ShieldCheck,
  Building2,
  Shield,
  Banknote,
} from 'lucide-react'

const menuItems = [
  {
    label: 'Tableau de bord',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Clients',
    path: '/clients',
    icon: Users,
  },
  {
    label: 'Comptes',
    path: '/comptes',
    icon: Wallet,
  },
  {
    label: 'Épargne',
    path: '/epargne',
    icon: PiggyBank,
  },
  {
    label: 'Prêts',
    path: '/prets',
    icon: HandCoins,
  },
  {
    label: 'Transactions',
    path: '/transactions',
    icon: ArrowLeftRight,
  },
  {
    label: 'Utilisateurs',
    path: '/users',
    icon: UserCog,
  },
  {
    label: "Journal d'activité",
    path: '/journal_activite',
    icon: ClipboardList,
  },
  {
    label: 'Rôles et permissions',
    path: '/role_permission',
    icon: ShieldCheck,
  },
  {
    label: 'Succursales',
    path: '/succursale',
    icon: Building2,
  },
  {
    label: 'Garanties',
    path: '/garantie',
    icon: Shield,
  },
  {
    label: 'Remboursements',
    path: '/remboursement',
    icon: Banknote,
  },
]

function Sidebar() {
  return (
   <aside className="flex min-h-full w-full flex-col bg-purple-950 text-white">
      {/* Logo */}
      <div className="border-b border-purple-800 px-6 py-6">
        <h1 className="text-xl font-bold tracking-wide">
          MicroFin-App
        </h1>

        <p className="mt-1 text-xs text-purple-300">
          Gestion de microfinance
        </p>
      </div>

      {/* Menu de navigation */}
      <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-6">
        {menuItems.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-purple-600 font-semibold text-white shadow-md shadow-purple-950/30'
                    : 'text-purple-200 hover:bg-purple-800 hover:text-white'
                }`
              }
            >
              <Icon size={20} strokeWidth={1.8} />

              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      {/* Pied du sidebar */}
      <div className="border-t border-purple-800 px-6 py-4 text-xs text-purple-300">
        MicroFin-App © 2026
      </div>
    </aside>
  )
}

export default Sidebar

