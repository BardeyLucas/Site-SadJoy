// utils/useSanityImage.ts
import imageUrlBuilder from '@sanity/image-url'
import { createClient } from '@sanity/client'
import type { SanityImageSource } from '@sanity/image-url'

const client = createClient({
  projectId: 's8s4tdl3',
  dataset: 'production',
  apiVersion: '2026-01-02',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

export const useSanityImage = () => {
  const urlFor = (source: SanityImageSource) => (source ? builder.image(source) : null)

  return { urlFor }
}
