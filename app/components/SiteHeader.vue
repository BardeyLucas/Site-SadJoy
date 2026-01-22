<script setup lang="ts">
import NewLogoPortfolio from './assets/NewLogoPortfolio.vue';
import HeaderBurger from './assets/HeaderBurger.vue';
const isOpen = ref<boolean>(false)
const user = ref<boolean>(false)
</script>
<template>
    <header class="w-full flex md:px-5 lg:px-8 md:bg-slate-950 fixed z-10 md:whitespace-nowrap top-0">
        <nav class="w-full flex items-center justify-between bg-slate-950 h-16 md:h-20 lg:h-28 px-5 md:px-0">
            <RouterLink to="/" class="flex items-center gap-4">
                <NewLogoPortfolio class="h-9 md:h-11 lg:h-14 w-9 md:w-11 lg:w-14"/>
                <p class="font-semibold text-lg md:text-xl lg:text-3xl font-josefin mt-auto">FPF Lucas Bardey</p>
                <!-- Future Portfolio Features -->
            </RouterLink>
            <HeaderBurger @click="isOpen = !isOpen" class="h-7 w-7 md:hidden"/>
        </nav>
        <div class="w-full md:w-fit absolute flex md:relative">
            <button @click="isOpen = !isOpen" class="h-[100vh] md:h-fit w-[50vw] md:w-fit hidden" :class="{'!block': isOpen}"></button>
            <nav class="flex md:gap-8 lg:gap-12 items-center hidden md:flex" :class="{ '!flex flex-col md:flex-row bg-slate-900 md:bg-slate-950 h-[100vh] md:h-auto w-[50vw] md:w-auto sticky': isOpen, '!flex-col-reverse md:!flex-row justify-end': isOpen && user}">
                <NuxtLink v-if="!user" to="/connexion" class="md:bg-slate-700 hover:md:bg-slate-600 active:md:bg-slate-500 border-slate-500 hover:border-slate-400 active:border-slate-300 w-full md:w-fit h-16 md:h-fit md:rounded-full border-b md:border"><button class="h-full w-full px-4 py-1.5 text-lg md:text-base lg:text-xl">Connexion</button></NuxtLink>
                <NuxtLink v-else to="/succes" class="md:bg-slate-700 hover:md:bg-slate-600 active:md:bg-slate-500 border-slate-500 hover:border-slate-400 active:border-slate-300 w-full md:w-fit h-16 md:h-fit md:rounded-full border-b md:border"><button class="h-full w-full px-4 py-1.5 text-lg md:text-base lg:text-xl">Voir mes succès</button></NuxtLink>
                <NuxtLink v-if="!user" to="/inscription" class="md:bg-slate-700 hover:md:bg-slate-600 active:md:bg-slate-500 border-slate-500 hover:border-slate-400 active:border-slate-300 w-full md:w-fit h-16 md:h-fit md:rounded-full border-b md:border"><button class="h-full w-full px-4 py-1.5 text-lg md:text-base lg:text-xl">Inscription</button></NuxtLink>
                <div v-else class="w-full md:w-auto h-16 md:h-auto flex justify-center items-center bg-slate-950 gap-5"><p class="text-lg md:text-base lg:text-xl">Users</p><button class="bg-[url(https://picsum.photos/640/640?random=7)] bg-cover h-10 lg:h-14 w-10 lg:w-14 rounded-full border border-slate-500 text-lg md:text-base lg:text-xl"></button></div>
            </nav>
        </div>
    </header>
</template>