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
    "mainImages": mainImages[]{
      _type,
      asset->{_id, url},
      alt,
      caption
    }
  }
`

onMounted(async () => {
  games.value = await client.fetch(gamesQuery, { id: gameId })
})

const items = computed<string[]>(() => {
  if (!games.value?.mainImages) return []

  return games.value.mainImages
    .map(image => image.asset?.url)
    .filter(Boolean)
})

</script>

<template>
  <UCarousel
    :items="items"
    :slides="1"
    loop
    arrows
    wheel-gestures
    dots
    :autoplay="{ delay: 8000, stopOnInteraction: false }"
    class="relative group overflow-hidden rounded-lg"
    :ui="{
      container: 'relative',
      item: 'flex-[0_0_100%]',
      prev:
        'absolute left-5 top-1/2 z-10 ring-indigo-600' +
        'hidden md:flex items-center justify-center ' +
        'w-14 h-14 ' +
        'bg-gradient-to-r from-black/70 to-transparent ' +
        'opacity-0 group-hover:opacity-100 ' +
        'transition-all duration-300 ' +
        'hover:from-black/90',
      next:
        'absolute right-5 top-1/2 z-10 ring-indigo-600' +
        'hidden md:flex items-center justify-center ' +
        'w-14 h-14 ' +
        'bg-gradient-to-l from-black/70 to-transparent ' +
        'opacity-0 group-hover:opacity-100 ' +
        'transition-all duration-300 ' +
        'hover:from-black/90'
    }"
  >
    <template #default="{ item }">
      <img
        :src="item"
        class="w-full aspect-[16/9] object-cover object-cover"
        loading="lazy"
      />
    </template>
  </UCarousel>
</template>
<style lang="scss">
  [role="tablist"] {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 1rem; // sous le carrousel
    
    display: flex;
    justify-content: center;
    gap: 0.5rem;

    pointer-events: auto;
  }
  [role="tab"] {
    width: 10px;
    height: 10px;
    border-radius: 9999px;
    background-color: rgba(255, 255, 255, 0.4);
    border: none;
    cursor: pointer;
    transition: all 0.25s ease;

    &[aria-selected="true"] {
      background-color: rgba(255, 255, 255, 1);
      transform: scale(1.2);
    }
  }
  [data-slot="viewport"] {
    overflow: hidden;
  }
</style>