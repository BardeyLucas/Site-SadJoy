<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { logout as logoutUser } from '~/composables/useAuth' // ⚡ le composable
import { pseudo as pseudoRef } from '~/composables/useAuth'
import { avatar as avatarRef } from '~/composables/useAuth'

const router = useRouter()

const ModifName = ref<boolean>(false)
const ModifMail = ref<boolean>(false)
const ModifMDP = ref<boolean>(false)

const originalPseudo = ref(pseudoRef.value)
const draftPseudo = ref(pseudoRef.value)
const hasChanges = ref(false)
const loadingSave = ref(false)
const errorSave = ref('')

const originalAvatar = ref<string | null>(avatarRef.value || null) // valeur serveur
const draftAvatarFile = ref<File | null>(null) // fichier choisi
const draftAvatarPreview = ref<string | null>(null) // preview locale

// ⚡ nouvelle fonction qui utilise le composable
const logout = async () => {
  try {
    await logoutUser() // ⚡ met user.value à false et supprime le cookie côté serveur
    router.push('/connexion')
  } catch (err) {
    console.error('Erreur lors de la déconnexion', err)
  }
}

const saveAllChanges = async () => {
  if (!hasChanges.value) return

  try {
    loadingSave.value = true

    // 🔹 pseudo
    if (draftPseudo.value !== originalPseudo.value) {
      const res: any = await $fetch('/api/player/update-pseudo-post', {
        method: 'POST',
        credentials: 'include',
        body: { pseudo: draftPseudo.value }
      })

      pseudoRef.value = res.pseudo
      originalPseudo.value = res.pseudo
    }

    // 🔹 avatar
    // 🔹 avatar
if (draftAvatarFile.value) {
  const formData = new FormData()
  formData.append('avatar', draftAvatarFile.value)

  // envoie au serveur
  const res: any = await $fetch('/api/player/update-avatar-post', {
    method: 'POST',
    credentials: 'include',
    body: formData
  })

  // ⚡ on stocke l'URL définitive
  originalAvatar.value = res.avatarUrl
  avatarRef.value = res.avatarUrl // pour le header
  draftAvatarPreview.value = null
  draftAvatarFile.value = null
}


    hasChanges.value = false
  } catch (err) {
    errorSave.value = 'Erreur lors de la sauvegarde'
  } finally {
    loadingSave.value = false
  }
}

// pour prévisualisation temporaire
const onSelectAvatar = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files || !input.files[0]) return

  const file = input.files[0]

  // sécurité basique
  if (!file.type.startsWith('image/')) return

  draftAvatarFile.value = file
  draftAvatarPreview.value = URL.createObjectURL(file)
  hasChanges.value = true
}




</script>
<template>
    <section class="flex border border-slate-950">
        <section class="flex-1 p-5">
            <h1 class="text-2xl font-semibold bg-slate-900 w-fit h-fit px-4 py-2 rounded-sm rounded-xl">Mode d'édition</h1>
            <header class="flex mt-5">
                <div class="relative bg-orange-500 h-32 w-32 border-2 border-slate-600">
  <img
  v-if="draftAvatarPreview || originalAvatar"
  :src="(draftAvatarPreview || originalAvatar) ?? undefined"
  class="absolute inset-0 w-full h-full object-cover"
/>

  <label class="absolute right-0 bottom-0 w-12 h-12 bg-slate-700 opacity-85 p-2 rounded-tl cursor-pointer">
    <AssetsParametres />
    <input
      type="file"
      accept="image/*"
      class="hidden"
      @change="onSelectAvatar"
    />
  </label>
</div>

                <div class="flex flex-col p-5 pt-0 sm:p-5 ">
                    <div v-if="!ModifName" class="flex items-center h-fit w-fit gap-1"><h2 class="text-2xl font-light self-start w-fit break-words capitalize">{{  draftPseudo || pseudo }}</h2><AssetsIconPen  @click="ModifName = true" class="w-8 h-8 p-1 rounded-full bg-white bg-opacity-0 hover:bg-opacity-10 active:bg-opacity-20"/></div>
                    <nav class="block md:hidden mt-2">
                        <RouterLink to="/users/edit"><button class="mt-4 bg-indigo-800 text-white px-3 py-1.5 rounded-sm">Enregistrer les modifications</button></RouterLink>
                    </nav>
                    <form v-if="ModifName" @submit.prevent="  () => {
    if (draftPseudo.length < 3) return
    ModifName = false
    hasChanges = true
  }" class="flex flex-wrap w-fit">
                      <input
                        v-model="draftPseudo"
                        type="text"
                        :placeholder="draftPseudo || 'Nouveau pseudo'"
                        class="mt-2 mr-2 px-2 bg-slate-600 border border-slate-500 rounded"
                      />

                      <div class="flex gap-2 mt-2">
                          <button type="submit" class="text-sm px-2 bg-indigo-900 rounded text-white h-[23.5px]">Valider</button>
                        <button
                          type="button"
                          @click="ModifName = false"
                          class="text-sm px-2 bg-gray-950 rounded text-white h-[23.5px]"
                        >
                          Annuler
                        </button>
                      </div>
                    </form>
                </div>
            </header>
            <section class="flex flex-col mt-5 bg-slate-900 p-5 rounded-lg">
                <label for="email" class="font-semibold">Email</label>
                <div v-if="!ModifMail" class="flex items-center h-fit opacity-55"><p class="p-2 pr-1 font-light">{{ email }}</p><AssetsIconPen @click="ModifMail = !ModifMail" class="w-6 h-6 p-1 rounded-full bg-white bg-opacity-0 hover:bg-opacity-10 active:bg-opacity-20"/></div>
                <form v-if="ModifMail" action="" class="flex flex-wrap">
                    <input type="email" id="email" name="email" class="mt-2 ml-2 bg-slate-600 border border-slate-500 rounded">
                    <div class="flex gap-2 mt-2 mx-2">
                    <button class="text-sm px-2 bg-indigo-900 rounded text-white h-[23.5px]">Enregistrer</button>
                    <button @click="ModifMail = !ModifMail" class="text-sm px-2 bg-gray-950 rounded text-white h-[23.5px]">Annuler</button>
                    </div>
                </form>
                <label for="motdepasse" class="mt-5 font-semibold">Mot de passe</label>
                <!-- <input type="text" id="motdepasse" name="motdepasse" class="mt-2 bg-slate-600 border border-slate-50 rounded"> -->
                <div v-if="!ModifMDP" class="flex items-center h-fit opacity-55"><p class="p-2 pr-1 font-light">••••••••</p><AssetsIconPen @click="ModifMDP = !ModifMDP" class="w-6 h-6 p-1 rounded-full bg-white bg-opacity-0 hover:bg-opacity-10 active:bg-opacity-20"/></div>
                <form v-if="ModifMDP" action="" class="flex flex-wrap">
                    <input type="email" id="email" name="email" class="mt-2 ml-2 bg-slate-600 border border-slate-500 rounded">
                    <div class="flex gap-2 mt-2 mx-2">
                    <button class="text-sm px-2 bg-indigo-900 rounded text-white h-[23.5px]">Enregistrer</button>
                    <button @click="ModifMDP = !ModifMDP" class="text-sm px-2 bg-gray-950 rounded text-white h-[23.5px]">Annuler</button>
                    </div>
                </form>
            </section>
        </section>
        <nav class="bg-slate-900 w-fit p-5 hidden md:flex flex-col justify-between">
            <button @click="saveAllChanges" :disabled="!hasChanges || loadingSave" class="bg-indigo-800 hover:bg-indigo-700 active:bg-indigo-600 text-white px-3 py-1.5 rounded-sm">Enregistrer les modifications</button>
            <div class="mt-auto flex flex-col gap-3">
                <button 
                    @click="logout"
                    class="bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white px-3 py-1.5 rounded-sm">
                    Ce déconnecter
                </button>                 
                <button class="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white px-3 py-1.5 rounded-sm">Supprimé son compte</button>                
            </div>
        </nav>
    </section>
</template>