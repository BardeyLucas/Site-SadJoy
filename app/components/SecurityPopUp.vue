<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{ modelValue: boolean }>()

// ⚡ Ici on déclare emit pour pouvoir l'utiliser
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'validated'): void
}>()

const showReauthPopup = ref(false)
const email = ref('')
const password = ref('')
const errorReauth = ref('')

// Synchronisation avec la prop
watch(
  () => props.modelValue,
  (val) => {
    showReauthPopup.value = val
  }
)

const closeReauthPopup = () => {
  showReauthPopup.value = false
  emit('update:modelValue', false)
}

const submitReauth = async () => {
  // Ici tu mets la vraie validation
  const success = true
  if (success) {
    emit('validated')  // ⚡ maintenant ça fonctionne
    closeReauthPopup()
  } else {
    errorReauth.value = 'Email ou mot de passe incorrect'
  }
}
</script>


<template>
  <div v-if="showReauthPopup" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div class="bg-slate-900 p-6 rounded-lg w-96">
      <h2 class="text-xl font-semibold mb-4">Vérification de sécurité</h2>
      <input v-model="email" type="email" placeholder="Email" class="w-full mb-2 px-3 py-1 rounded bg-slate-700 border border-slate-600 text-white"/>
      <input v-model="password" type="password" placeholder="Mot de passe" class="w-full mb-2 px-3 py-1 rounded bg-slate-700 border border-slate-600 text-white"/>
      <p v-if="errorReauth" class="text-red-500 text-sm mb-2">{{ errorReauth }}</p>
      <div class="flex justify-end gap-2">
        <button @click="closeReauthPopup" class="px-3 py-1 bg-gray-700 rounded text-white">Annuler</button>
        <button @click="submitReauth" class="px-3 py-1 bg-indigo-800 rounded text-white">Valider</button>
      </div>
    </div>
  </div>
</template>

