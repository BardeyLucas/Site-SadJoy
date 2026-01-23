<script setup lang="ts">
import { useRouter } from 'vue-router'
import { logout as logoutUser } from '~/composables/useAuth' // ⚡ le composable
const router = useRouter()

// ⚡ nouvelle fonction qui utilise le composable
const logout = async () => {
  try {
    await logoutUser() // ⚡ met user.value à false et supprime le cookie côté serveur
    router.push('/connexion')
  } catch (err) {
    console.error('Erreur lors de la déconnexion', err)
  }
}
</script>
<template>
    <section class="flex border border-slate-950">
        <section class="flex-1 p-5">
            <header class="flex">
                <div class="bg-orange-500 h-32 sm:h-40 w-32 sm:w-40 border-2 border-slate-600"></div>
                <div class="flex flex-col p-5 pt-0 sm:p-5 ">
                    <h1 class="text-2xl font-light break-words">Denki kaminari</h1>
                    <nav class="block md:hidden mt-2">
                        <div class="flex gap-2 items-center">
                            <p class="hidden sm:block">Nombre de succès obtenu : </p>
                            <p class="block sm:hidden">Nb succès : </p>
                            <div class="rounded-full ring-2 ring-indigo-500 w-8 sm:w-10 h-8 sm:h-10 flex justify-center items-center">
                                <p class="font-bold font-xl">10</p>
                            </div>
                        </div>
                        <div>
                            <RouterLink to="/users/edit"><button class="mt-4 bg-indigo-800 text-white px-3 py-1.5 rounded-sm">Paramètres</button></RouterLink>
                            <button 
                                @click="logout"
                                class="bg-gray-900 hover:bg-gray-700 active:bg-gray-600 text-white px-3 py-1.5 rounded-sm m-5">
                                Ce déconnecter
                            </button>   
                        </div>
                    </nav>
                </div>
            </header>
            <section class="bg-slate-900 p-3 mt-5 rounded-lg">
                <div class="flex gap-2 mt-2 items-center">
                    <div class="w-12 h-12 bg-orange-500 rounded border border-slate-700"></div>
                    <h2 class="text-xl font-semibold">Sad Joy</h2>
                </div>
                <div class="px-5 pt-3 mt-5 pb-1 border-t border-slate-600">
                    <div class="flex justify-between items-center">
                        <h2>Succès remportés : 0/10</h2>
                        <p>(0%)</p>
                    </div>
                    <div class="w-full h-2 bg-gray-800 rounded-full mt-2">
                        <!-- Base de progression -->
                    </div>
                </div>
            </section>
        </section>
        <nav class="bg-slate-900 w-fit hidden md:flex flex-col justify-between">
            <div class="p-5">
                <div class="flex gap-2 items-center">
                    <p>Nombre de succès obtenu : </p>
                    <div class="rounded-full ring-2 ring-indigo-500 w-10 h-10 flex justify-center items-center">
                        <p class="font-bold font-xl">10</p>
                    </div>
                </div>
                <RouterLink to="/users/edit"><button class="mt-6 bg-indigo-800 text-white px-3 py-1.5 rounded-sm">Paramètres</button></RouterLink>
            </div>
            <button 
                @click="logout"
                class="bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white px-3 py-1.5 rounded-sm m-5">
                Ce déconnecter
            </button>        
        </nav>
    </section>
</template>