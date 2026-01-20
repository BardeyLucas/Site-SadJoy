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
    :autoplay="{ delay: 8000, stopOnInteraction: false }"
    wheel-gestures
    :prev="{ variant: 'solid' }"
    :next="{ variant: 'solid' }"
    :ui="{
      item: 'flex-[0_0_100%] ps-0',
      prev: 'sm:start-8',
      next: 'sm:end-8',
      container: 'ms-0'
    }"
    style="overflow-hidden"
  >
    <template #default="{ item }">
      <img
        :src="item"
        class="w-full h-48 object-cover"
        loading="lazy"
      />
    </template>
  </UCarousel>

</template>