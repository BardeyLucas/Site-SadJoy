import {defineType, defineField} from 'sanity'

export const gameType = defineType({
  name: 'game',
  title: 'Jeu',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Titre du jeu',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'mainImages',
      title: 'Imagerie principale',
      type: 'array',
      of: [{type: 'image'}],
      options: {
        layout: 'grid',
      },
    }),

    defineField({
      name: 'progress',
      title: 'Avancement',
      type: 'string',
      options: {
        list: [
          {title: 'Terminé', value: 'finished'},
          {title: 'Accès anticipé', value: 'early_access'},
          {title: 'Bientôt disponible', value: 'coming_soon'},
          {title: 'Non disponible', value: 'unavailable'},
        ],
        layout: 'radio',
      },
    }),

    defineField({
      name: 'progressNote',
      title: "Remarque sur l'avancement",
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'faq',
      title: 'Questions / Réponses',
      type: 'array',
      of: [{type: 'block'}],
    }),

    defineField({
      name: 'playerNumber',
      title: 'Nombre de joueurs',
      type: 'string',
      description: 'Ex: Solo, 1-4 joueurs, Multijoueur en ligne…',
    }),

    defineField({
      name: 'achievementsEnabled',
      title: 'Succès activés',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'languages',
      title: 'Langues disponibles',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              {title: 'Français', value: 'fr'},
              {title: 'Anglais', value: 'en'},
            ],
          },
        },
      ],
    }),

    defineField({
      name: 'gameType',
      title: 'Type de jeu',
      type: 'string',
      description: 'Ex: Action, RPG, Plateformer, Puzzle…',
    }),

    defineField({
      name: 'releaseDate',
      title: 'Date de sortie',
      type: 'date',
    }),

    defineField({
      name: 'releaseType',
      title: 'Type de sortie',
      type: 'string',
      options: {
        list: [
          {title: 'Définitive', value: 'definitive'},
          {title: 'Anticipée', value: 'early'},
        ],
        layout: 'radio',
      },
    }),

    defineField({
      name: 'downloadUrls',
      title: 'URLs de téléchargement',
      type: 'array',
      of: [
        {
          type: 'url',
          validation: Rule =>
            Rule.uri({
              scheme: ['http', 'https'],
            }),
        },
      ],
      validation: Rule => Rule.max(3),
    }),

    defineField({
      name: 'about',
      title: 'À propos',
      type: 'array',
      of: [
        {type: 'block'},
        {
            type: 'image',
            options: {
                hotspot: true,
            },
        },
    ],
    }),

    defineField({
      name: 'updateNotes',
      title: 'Notes de mise à jour',
      type: 'array',
      of: [
        {type: 'block'},
        {
            type: 'image',
            options: {
                hotspot: true,
            },
          },
        ],
    }),
  ],
})
