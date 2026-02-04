import type {PortableTextBlock} from '@portabletext/types'

export interface UpdateNote {
  content: PortableTextBlock[]
  version: string
  date: string // datetime Sanity → string ISO
}

/**
 * Image Sanity (asset + métadonnées)
 */
export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
}

/**
 * URLs de téléchargement
 */
export interface DownloadUrl {
  _type: 'url'
  value: string
}

/**
 * Avancement du jeu
 */
export type GameProgress =
  | 'finished'
  | 'early'
  | 'coming_soon'
  | 'unavailable'

/**
 * Type de sortie
 */
export type ReleaseType = 'definitive' | 'early'

/**
 * Langues disponibles
 */
export type GameLanguage = 'fr' | 'en'

/**
 * Document Game
 */
export interface games {
  _id: string
  _type: 'game'
  _createdAt: string
  _updatedAt: string

  title: string

  mainImages?: SanityImage[]

  progress?: GameProgress
  progressNote?: string

  faq?: PortableTextBlock[]

  playerNumber?: string

  achievementsEnabled?: boolean

  languages?: GameLanguage[]

  gameType?: string

  releaseDate?: string

  releaseType?: ReleaseType

  downloadUrls?: string[]

  about?: PortableTextBlock[]

  updateNotes?: UpdateNote[]
}
