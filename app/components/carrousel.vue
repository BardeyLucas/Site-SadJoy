<script setup lang="ts">
const items: string[] = [
  'https://picsum.photos/640/640?random=1',
  'https://picsum.photos/640/640?random=2',
  'https://picsum.photos/640/640?random=3',
  'https://picsum.photos/640/640?random=4',
  'https://picsum.photos/640/640?random=5',
  'https://picsum.photos/640/640?random=6'
]
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
    class="relative group overflow-hidden rounded-lg lg:col-span-2 lg:row-span-2"
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
        class="w-full h-[56.25vw] lg:h-[432px] object-cover"
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