<script setup lang="ts">
import { ref, onMounted } from 'vue'
import groq from 'groq'
import type { Game } from '@/types/game'
import { useSanityClient } from '~/composables/sanity'
import { h } from 'vue'
import { computed } from 'vue'

const client = useSanityClient()
const games = ref<Game | null>(null)

const gameId = '0dfb417a-40fd-433c-a6d5-e690d24444b7'

const gamesQuery = groq`
  *[_type == "game" && _id == $id][0]{
    _id,
    title,
    "mainImages": mainImages[]{
      _type,
      asset->{_id, url},
      alt,
      caption
    },
    progress,
    progressNote,
    playerNumber,
    achievementsEnabled,
    languages,
    gameType,
    releaseDate,
    releaseType,
    downloadUrls,
    about[]{
      ...,
      _type == "image" => {
        asset->{_id, url},
        alt,
        caption
      }
    },
    updateNotes[]{
      version,
      date,
      content[]{
        ...,
        _type == "image" => {
          asset->{_id, url},
          alt,
          caption
        }
      }
    },
    faq
  }
`


onMounted(async () => {
  games.value = await client.fetch(gamesQuery, { id: gameId })
})

import { PortableText } from '@portabletext/vue'
import type { PortableTextBlock } from '@portabletext/types'

import { computed } from 'vue'

const content = computed<PortableTextBlock[]>(() => {
  return games.value?.faq ?? []
})

const AboutContent = computed<PortableTextBlock[]>(() => {
  return games.value?.about ?? []
})

const NoteContent = computed<PortableTextBlock[][]>(() => {
  return games.value?.updateNotes?.map(note => note.content) ?? []
})


const components = {
  block: {
    h3: ({ value }) => h('h3', { class: 'px-5 pt-5 font-semibold text-sm' }, value.children.map(c => c.text)),
    h4: ({ value }) => h('h4', { class: 'mt-4 font-semibold' }, value.children.map(c => c.text)),
    normal: ({ value }) => h('p', { class: 'px-5 pb-5 opacity-75 text-sm mt-1' }, value.children.map(c => c.text)),
  },
  
  list: {
    bullet: ({ children }) =>
      h(
        'ul',
        {
          class:
            'mt-2 ml-8 list-disc space-y-1 px-5 text-sm opacity-75',
        },
        children
      ),
  },

  listItem: {
    bullet: ({ children }) =>
      h(
        'li',
        { class: 'leading-relaxed' },
        children
      ),
  },

  types: {
    image: ({ value }) =>
      h('img', {
        src: value.asset?.url,
        alt: value.alt || 'Image du jeu',
        class:
          'w-full aspect-[16/9] mb-5 object-cover rounded-lg shadow-md',
        loading: 'lazy',
      }),
  },

  marks: {
    strong: ({ children }) => h('strong', { class: 'font-bold' }, children),
    em: ({ children }) => h('em', { class: 'italic' }, children),
  }
}

const formattedReleaseDate = computed(() => {
  if (!games.value?.releaseDate) return ''
  const date = new Date(games.value.releaseDate)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // mois commence à 0
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
})


const releaseTitle = computed(() => {
  switch (games.value?.releaseType) {
    case 'early': return "Jeu en accès anticipé"
    case 'finished': return "Jeu terminé"
    case 'coming_soon': return "Bientôt disponible"
    case 'unavailable': return "Non disponible"
    default: return "Statut inconnu"
  }
})

const releaseText = computed(() => {
  switch (games.value?.releaseType) {
    case 'early': return "Les jeux en accès anticipé ne sont pas terminés, ils peuvent changer de façon significative. Si ce jeu ne vous intéresse pas dans son état actuel, vous devriez attendre pour voir s'il se développe davantage."
    case 'finished': return ""
    case 'coming_soon': return "Ce jeu sera bientôt disponible. Il n’est pas encore accessible, mais vous pouvez vous préparer à le découvrir dès sa sortie officielle. Restez attentif aux mises à jour pour ne rien manquer !"
    case 'unavailable': return "Ce jeu n’est pas disponible et il n’est pas prévu qu’il sorte un jour. Si ce titre ne vous intéresse pas, vous pouvez consulter nos autres jeux pour découvrir des expériences déjà accessibles."
    default: return ""
  }
})

const downloadPlatforms = computed(() => {
  if (!games.value?.downloadUrls) return []

  const platforms = [
    {
      key: 'windows',
      label: 'Windows',
      icon: 'windows',
      url: games.value.downloadUrls[0]
    },
    {
      key: 'apple',
      label: 'Apple',
      icon: 'apple',
      url: games.value.downloadUrls[1]
    },
    {
      key: 'linux',
      label: 'Linux',
      icon: 'linux',
      url: games.value.downloadUrls[2]
    }
  ]

  return platforms.filter(p => p.url)
})

</script>
<template>
    <header class="lg:grid lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] gap-y-5 gap-x-10 p-5">
    <section class="lg:col-span-2 lg:row-span-2">
        <carrousel/>
        <h1 class="font-josefin font-bold text-3xl mt-5 w-full bg-slate-700 pt-3 pb-1 px-3 rounded-lg">{{ games?.title }}</h1>
    </section>
    <section class="lg:col-span-1 lg:col-start-3 lg:row-span-3 lg:row-start-1 lg:flex lg:flex-col">
        <article class="my-5 lg:mt-0 border border-indigo-700 rounded-lg overflow-hidden shadow-md">
            <div v-if="games?.releaseType != 'finished'" class="bg-indigo-800 p-5">
                <h2 class="text-lg font-semibold">{{ releaseTitle }}</h2>
                <p class="mt-2">
                    <i>
                        <span class="font-bold">Remarque : </span>
                        <span class="opacity-75">{{ releaseText }}</span>
                    </i>
                </p>
            </div>
            <!-- {{ games?.faq}} -->
            <ClientOnly>
                <PortableText
                    v-if="content && content.length"
                    :value="content"
                    :components="components"
                />
            </ClientOnly>
            <!-- <h3 class="px-5 pt-5 font-semibold text-sm">Le développement du jeu est il toujours en cours ?</h3>
            <p class="px-5 pb-5 opacity-75 text-sm mt-1">Non celui ci est en pause, mais il reprendra en juin.</p> -->
        </article>
        <section>
            <h2 class="text-lg font-semibold">Fonctionnalités</h2>
            <div class="grid lg:block sm:grid-cols-2 gap-x-4">
                <div class="flex items-center gap-3 mt-3 px-4 bg-indigo-900 rounded-lg py-3 shadow-md">
                    <assets-icon-number-player class="w-7 h-7"/>
                    <p>{{ games?.playerNumber }}</p>
                </div>
                <div class="flex items-center gap-3 mt-3 px-4 bg-indigo-900 rounded-lg py-3 shadow-md">
                    <assets-icon-succes class="w-7 h-7"/>
                    <p>{{ games?.achievementsEnabled ? 'Succés disponible' : 'Aucun succés disponible' }}</p>
                </div>
                <div class="flex items-center gap-3 mt-3 px-4 bg-indigo-900 rounded-lg py-3 shadow-md">
                    <assets-icon-language class="w-7 h-7"/>
                    <p>
                        {{
                            games?.languages
                            ? games.languages
                                .map(lang => lang === 'fr' ? 'Français' : lang === 'en' ? 'Anglais' : lang)
                                .join(' / ')
                            : 'Langues non spécifiées'
                        }}
                    </p>
                </div>
                <div class="flex items-center gap-3 mt-3 px-4 bg-indigo-900 rounded-lg py-3 shadow-md">
                    <assets-icon-genres class="w-7 h-7"/>
                    <p>{{ games?.gameType }}</p>
                </div>
                <div class="flex items-center gap-3 mt-3 px-4 bg-indigo-900 rounded-lg py-3 shadow-md">
                    <assets-icon-parutions class="w-7 h-7"/>
                    <p>Date de sortie de l'accès anticipé : {{ formattedReleaseDate }}</p>
                </div>
            </div>
        </section>
    </section>
    <section v-if="downloadPlatforms.length" class="lg:col-span-2 lg:col-start-1 lg:row-span-1 lg:row-start-3">
        <h2 class="text-lg font-semibold max-w-[528px] mx-auto mt-5 lg:mt-0">Téléchargement</h2>
        <div class="flex justify-center gap-5 sm:gap-12 mt-5">
            <div v-for="platform in downloadPlatforms" :key="platform.key" class="flex flex-col items-center bg-indigo-900 w-32 sm:w-36 p-4 rounded-lg overflow-hidden shadow-md text-xs sm:text-base">
                <p class="mr-auto opacity-75">Version :</p>
                <h3 class="mt-1 sm:mt-2">{{ platform.label }}</h3>
                <assets-icon-windows v-if="platform.icon === 'windows'" class="w-10 sm:w-12 h-10 sm:h-12 mt-1"/>
                <assets-icon-apple v-if="platform.icon === 'apple'" class="w-10 sm:w-12 h-10 sm:h-12 mt-1"/>
                <assets-icon-linux v-if="platform.icon === 'linux'" class="w-10 sm:w-12 h-10 sm:h-12 mt-1"/>
                <a :href="platform.url" target="_blank" rel="noopener noreferrer"><button class="mt-6 sm:mt-8 px-1.5 sm:px-3 py-1 sm:py-2 border bg-indigo-700 hover:bg-indigo-600 active:bg-indigo-500 border-indigo-600 hover:border-indigo-500 active:border-indigo-400 rounded shadow-md">Télécharger</button></a>
            </div>
        </div>
    </section>
    </header>
    <section class="lg:flex gap-x-20 gap-y-16 p-5">
        <div class="lg:flex-1">
            <h2 class="text-lg font-semibold mb-5">À propos de ce jeu</h2>
            <ClientOnly>
                <PortableText
                    v-if="AboutContent && AboutContent.length"
                    :value="AboutContent"
                    :components="components"
                />
            </ClientOnly>
            <!-- <img src="https://picsum.photos/640/640?random=7" alt="Aperçu du jeu Sad Joy" class="w-full aspect-[16/9] object-cover mt-5 rounded-lg shadow-md"/>
            <p class="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget tortor nec justo sagittis ultrices. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed at libero nec lorem consequat tincidunt. Integer non magna vitae eros volutpat viverra. Curabitur ac elit vel nulla pulvinar commodo.</p>
            <p class="mt-2">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse potenti. Aenean vehicula, lorem at convallis faucibus, risus magna posuere purus, sed tempor justo nisi vitae magna.</p>
            <h3 class="mt-8 text-lg font-semibold">Gameplay dynamique et exigeant</h3>
            <img src="https://picsum.photos/640/640?random=8" alt="Aperçu du jeu Sad Joy" class="w-full aspect-[16/9] object-cover mt-5 rounded-lg shadow-md"/>
            <p class="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus, sapien nec tincidunt posuere, magna sem efficitur lorem, id placerat nulla sapien id odio. Praesent euismod, orci non facilisis faucibus, tortor libero consequat metus, non tincidunt urna nisl at libero.</p>
            <ul class="mt-2 list-disc ml-5">
                <li>Lorem ipsum dolor sit amet</li>
                <li>Consectetur adipiscing elit</li>
                <li>Sed do eiusmod tempor incididunt</li>
            </ul>
            <p class="mt-2">Nam eget massa vitae mauris dignissim tincidunt. Integer a arcu sed est aliquet hendrerit. Duis nec justo nec lectus pharetra commodo.</p>
            <h3 class="mt-8 text-lg font-semibold">Un univers 2D riche et immersif</h3>
            <img src="https://picsum.photos/640/640?random=9" alt="Aperçu du jeu Sad Joy" class="w-full aspect-[16/9] object-cover mt-5 rounded-lg shadow-md"/>
            <p class="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur id sapien nec magna ultrices volutpat. Morbi dignissim, lorem sed luctus efficitur, magna sapien consequat turpis, nec interdum libero urna at sapien.</p>
            <p class="mt-2">Vivamus at velit nec purus volutpat scelerisque. Aliquam erat volutpat. Fusce non nulla sed nisl bibendum feugiat nec vitae magna.</p>
            <h3 class="mt-8 text-lg font-semibold">Êtes-vous prêt à relever le défi ?</h3>
            <img src="https://picsum.photos/640/640?random=10" alt="Aperçu du jeu Sad Joy" class="w-full aspect-[16/9] object-cover mt-5 rounded-lg shadow-md"/>
            <p class="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vehicula, neque sit amet dapibus interdum, sapien lorem placerat metus, at vulputate lorem lorem sed erat. Cras non libero ut risus fermentum pretium.</p> -->
        </div>
        <div class="lg:flex-1">
            <h2 class="text-lg font-semibold">Note de mise à jour</h2>
            <div v-for="note in games?.updateNotes" :key="note.version" class="w-full bg-gray-900 border border-gray-950 rounded-lg px-8 pt-4 shadow-md mt-4">
                <h3 class="text-lg font-semibold mb-3">{{ note.version }}</h3>
                <PortableText
                    v-if="note.content && note.content.length"
                    :value="note.content"
                    :components="components"
                />
            </div>
            <!-- <div class="w-full bg-gray-900 border border-gray-950 rounded-lg p-4 shadow-md mt-4">
                <h3 class="text-lg font-semibold">Notes de mise à jour — Version 0.3.1</h3>
                <img src="https://picsum.photos/640/640?random=11" alt="Aperçu du jeu Sad Joy" class="w-full aspect-[16/9] object-cover mt-5 rounded-lg shadow-md"/>
                <h4 class="mt-4 font-semibold">Changements généraux</h4>
                <p class="mt-2 text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Donec vel magna nec ipsum tempor malesuada. Integer euismod, lorem sed tincidunt elementum, arcu sapien luctus est, nec ultrices erat magna vitae metus.</p>
                <h4 class="mt-4 font-semibold">Gameplay</h4>
                <p class="mt-2 text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <ul class="mt-2 list-disc ml-5 text-gray-400">
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Consectetur adipiscing elit</li>
                    <li>Sed do eiusmod tempor incididunt</li>
                </ul>
                <h4 class="mt-4 font-semibold">Équilibrage</h4>
                <p class="mt-2 text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at velit nec ipsum interdum elementum. Curabitur sagittis, lorem non facilisis malesuada, purus turpis placerat eros, non feugiat arcu elit sit amet sapien.</p>
                <h4 class="mt-4 font-semibold">Corrections de bugs</h4>
                <p class="mt-2 text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <ul class="mt-2 list-disc ml-5 text-gray-400">
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Consectetur adipiscing elit</li>
                    <li>Sed do eiusmod tempor incididunt</li>
                </ul>
            </div> -->
            <!-- <div class="w-full bg-gray-900 border border-gray-950 rounded-lg p-4 shadow-md mt-4">
                <h3 class="text-lg font-semibold">Notes de mise à jour — Version 0.3.0</h3>
                <img src="https://picsum.photos/640/640?random=12" alt="Aperçu du jeu Sad Joy" class="w-full aspect-[16/9] object-cover mt-5 rounded-lg shadow-md"/>
                <h4 class="mt-4 font-semibold">Nouveautés</h4>
                <p class="mt-2 text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>
                <h4 class="mt-4 font-semibold">Améliorations</h4>
                <p class="mt-2 text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed odio dui. Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
                <h4 class="mt-4 font-semibold">Problèmes connus</h4>
                <p class="mt-2 text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Vestibulum id ligula porta felis euismod semper.</p>
            </div> -->
        </div>
    </section>
</template>