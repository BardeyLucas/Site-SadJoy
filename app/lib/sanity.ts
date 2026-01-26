import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 's8s4tdl3',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})
