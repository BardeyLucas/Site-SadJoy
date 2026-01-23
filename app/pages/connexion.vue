<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { user, pseudo } from '~/composables/useAuth' // ⚡ on importe l'état global

interface LoginResponse {
  player: {
    pseudo: string
  }
}

const router = useRouter()

const email = ref('')
const motdepasse = ref('')
const loading = ref(false)
const error = ref<string | null>(null)

const submitForm = async () => {
  error.value = null
  loading.value = true
  try {
    const res = await $fetch<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: motdepasse.value
      },
      credentials: 'include' // ✅ envoie le cookie httpOnly
    })

    // ⚡ on met user.value à true dès que la connexion est OK
    user.value = true
    pseudo.value = res.player.pseudo

    router.push('/') // ou la page de ton choix
  } catch (err: any) {
    error.value =
      err?.data?.statusMessage ?? 'Erreur lors de la connexion'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="max-w-[300px] bg-slate-700 py-5 px-10 mx-auto rounded-lg my-10">
    <h1 class="text-2xl font-bold w-fit">Connexion</h1>

    <form class="flex flex-col" @submit.prevent="submitForm">
      <label for="email" class="mt-5 font-semibold">Email</label>
      <input
        v-model="email"
        type="email"
        id="email"
        class="mt-2 bg-slate-600 border border-slate-50 rounded"
        required
      >

      <label for="motdepasse" class="mt-5 font-semibold">Mot de passe</label>
      <input
        v-model="motdepasse"
        type="password"
        id="motdepasse"
        class="mt-2 bg-slate-600 border border-slate-50 rounded"
        required
      >

      <button
        type="submit"
        :disabled="loading"
        class="mt-10 bg-indigo-700 w-fit px-3 py-1 rounded mx-auto
               border border-indigo-500
               hover:bg-indigo-600 hover:border-indigo-400
               active:bg-indigo-500 active:border-indigo-300
               disabled:opacity-50"
      >
        {{ loading ? 'Connexion…' : 'Se connecter' }}
      </button>

      <p v-if="error" class="text-red-400 text-sm mt-4 text-center">
        {{ error }}
      </p>
    </form>
  </section>
</template>
