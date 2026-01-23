import { ref } from 'vue'

export const user = ref<boolean>(false) // état global
export const pseudo = ref<string>('') // pseudo global

export const checkAuth = async () => {
  try {
    const res: any = await $fetch('/api/auth/check', {
      credentials: 'include'
    })
    if (res?.pseudo) {
      user.value = true
      pseudo.value = res.pseudo
    } else {
      user.value = false
      pseudo.value = ''
    }
    return res
  } catch (err) {
    user.value = false
    pseudo.value = ''
    console.error('Utilisateur non connecté', err)
    return null
  }
}

export const logout = async () => {
  try {
    await $fetch('/api/auth/logout', { method: 'POST' })
    user.value = false
    pseudo.value = ''
  } catch (err) {
    console.error(err)
  }
}
