<script setup lang="ts">
import { checkAuth } from '~/composables/useAuth'
const router = useRouter()

router.afterEach(() => {
  checkAuth()
})

</script>
<template>
  <SiteHeader />
    <main>
      <section class="w-full lg:max-w-[1248px] lg:mb-10 mx-auto h-full bg-slate-800 lg:rounded-lg overflow-hidden shadow-md mt-16 md:mt-20 lg:mt-40">
        <NuxtPage />
      </section>
    </main>
  <SiteFooter />
</template>