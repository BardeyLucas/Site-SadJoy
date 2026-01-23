import { ref } from 'vue'

export const user = ref(false)
export const pseudo = ref('')

export const checkAuth = async () => {
  try {
    const res: any = await $fetch('/api/auth/check', {
      credentials: 'include'
    })
    user.value = res.user
    pseudo.value = res.pseudo
    return res
  } catch (err) {
    user.value = false
    pseudo.value = ''
    console.error('Utilisateur non connecté', err)
    return null
  }
}

export const logout = async () => {
  await $fetch('/api/auth/logout', { method: 'POST' })
  user.value = false
  pseudo.value = ''

  // 🧠 empêche toute logique async en cours
  await nextTick()
}
