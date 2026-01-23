<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { user } from '~/composables/useAuth' // ⚡ on importe l'état global

const router = useRouter()

const pseudo = ref('')
const email = ref('')
const motdepasse = ref('')
const loading = ref(false)
const error = ref<string | null>(null)
const success = ref(false)

const submitForm = async () => {
  error.value = null
  success.value = false
  loading.value = true

  try {
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: {
        pseudo: pseudo.value,
        email: email.value,
        password: motdepasse.value
      },
      credentials: 'include' // ✅ pour envoyer les cookies httpOnly
    })

    success.value = true

    // ⚡ Met à jour l'état global pour le header
    user.value = true

    // Vider les champs
    pseudo.value = ''
    email.value = ''
    motdepasse.value = ''

    // Redirection vers la page principale ou tableau de bord
    router.push('/') 
  } catch (err: any) {
    error.value =
      err?.data?.statusMessage ??
      'Erreur lors de l’inscription'
  } finally {
    loading.value = false
  }
}

</script>

<template>
  <section class="max-w-[300px] bg-slate-700 py-5 px-10 mx-auto rounded-lg my-10">
    <h1 class="text-2xl font-bold w-fit">Inscription</h1>

    <form class="flex flex-col" @submit.prevent="submitForm">
      <label for="pseudo" class="mt-5 font-semibold">Pseudo</label>
      <input
        v-model="pseudo"
        type="text"
        id="pseudo"
        class="mt-2 bg-slate-600 border border-slate-50 rounded"
        required
      >

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
        {{ loading ? 'Inscription…' : "S'inscrire" }}
      </button>

      <p v-if="error" class="text-red-400 text-sm mt-4 text-center">
        {{ error }}
      </p>

      <p v-if="success" class="text-green-400 text-sm mt-4 text-center">
        Compte créé avec succès 🎉
      </p>
    </form>
  </section>
</template>
