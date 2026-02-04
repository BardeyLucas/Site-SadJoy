<template>
  <div v-if="modelValue" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-slate-900 p-6 rounded-lg w-96 flex flex-col gap-4">
      <h2 class="text-xl font-semibold">{{ title }}</h2>
      <p>{{ message }}</p>
      <div class="flex justify-end gap-3 mt-2">
        <button @click="$emit('update:modelValue', false)" class="px-3 py-1 bg-gray-700 text-white rounded">Annuler</button>
        <button @click="$emit('confirm')" class="px-3 py-1 bg-red-600 text-white rounded">Supprimer</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  modelValue: Boolean,
  title: String,
  message: String
})

defineEmits(['update:modelValue', 'confirm'])
</script>