// schemas/PortraitType.ts
import { defineType } from 'sanity'

export const PortraitType = defineType({
  name: 'portrait',
  title: 'Portrait',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nom',
      type: 'string',
      validation: (Rule) => Rule.required().min(1).max(50),
    },
    {
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'avatar',
    },
  },
})
