import { ref } from 'vue'
export const user = ref<boolean>(false) // état global

// useAuth.ts
// /composables/useAuth.ts
export const checkAuth = async () => {
  try {
    const res = await $fetch('/api/auth/check', {
      credentials: 'include' // ✅ envoie les cookies httpOnly
    })
    return res
  } catch (err) {
    console.error('Utilisateur non connecté', err)
    return null
  }
}


/**
 * Déconnecte l'utilisateur
 */
export const logout = async () => {
  try {
    await $fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
    user.value = false // ⚡ met à jour l'état global
  } catch (err) {
    console.error('Erreur lors de la déconnexion', err)
  }
}

/**
 * Connecte l'utilisateur côté client
 * ⚡ utile pour mettre à jour user.value après login/register
 */
export const loginSuccess = () => {
  user.value = true
}
