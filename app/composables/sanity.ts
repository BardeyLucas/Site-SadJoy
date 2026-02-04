import { createClient } from '@sanity/client'

export const useSanityClient = () =>
  createClient({
    projectId: 'nhw1hulo',        // ton projectId
    dataset: 'production',         // ton dataset
    apiVersion: '2026-01-04',      // version de l'API
    useCdn: true,                  // true = rapide mais données éventuellement mises en cache
  })
