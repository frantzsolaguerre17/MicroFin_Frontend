
import type { Client } from '../types/client'

const API_URL = import.meta.env.VITE_API_URL

export async function getClients(): Promise<Client[]> {
  const response = await fetch(`${API_URL}/clients/`)

  if (!response.ok) {
    throw new Error(`Erreur HTTP ${response.status}`)
  }

  return response.json()
}

export async function getClient(id: number): Promise<Client> {
  const response = await fetch(`${API_URL}/clients/${id}`)

  if (!response.ok) {
    throw new Error(`Impossible de récupérer le client (${response.status})`)
  }

  return response.json()
}

export async function createClient(data: Record<string, unknown>) {
  const response = await fetch(`${API_URL}/clients/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || `Erreur HTTP ${response.status}`)
  }

  return response.json()
}

export async function updateClient(
  id: number,
  data: Record<string, unknown>,
) {
  const response = await fetch(`${API_URL}/clients/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || `Erreur HTTP ${response.status}`)
  }

  return response.json()
}