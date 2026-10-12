

export interface Client {
  id: number
  code: string
  nom: string
  prenom: string
  sexe: string
  date_naissance: string
  telephone: string
  email: string | null
  adresse: string
  profession: string
  employeur: string
  salaire_mensuel:number
  statut: string
  date_adhesion: string
  type_piece_identite: string
  numero_piece_identite: string
  succursale_id: number
}