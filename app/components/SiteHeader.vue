<script setup lang="ts">
import NewLogoPortfolio from './assets/NewLogoPortfolio.vue';
import HeaderBurger from './assets/HeaderBurger.vue';
const isOpen = ref(null)
const user = ref<boolean>(false)
</script>
<template>
    <header class="w-full flex md:px-5 md:bg-slate-950">
        <nav class="w-full flex items-center justify-between bg-slate-950 h-16 md:h-20 px-5 md:px-0">
            <div class="flex items-center gap-4">
                <NewLogoPortfolio class="h-9 md:h-11 w-9 md:w-11"/>
                <p class="font-semibold text-lg md:text-xl font-josefin mt-auto">FPF Lucas Bardey</p>
                <!-- Future Portfolio Features -->
            </div>
            <HeaderBurger class="h-7 w-7 md:hidden"/>
        </nav>
        <nav class="flex gap-5 items-center hidden md:flex">
            <button v-if="!user" class="bg-slate-700 h-fit px-4 py-1.5 rounded-full border border-slate-500">Connexion</button>
            <NuxtLink v-else to="/succes" class="text-lg">Succès</NuxtLink>
            <button @click="user = true" v-if="!user" class="bg-slate-700 h-fit px-4 py-1.5 rounded-full border border-slate-500">Inscription</button>
            <button v-else class="bg-slate-700 h-10 w-10 rounded-full border border-slate-500"></button>
        </nav>
    </header>
</template>