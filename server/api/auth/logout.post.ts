// /server/api/auth/logout.post.ts
import { defineEventHandler, setCookie } from 'h3'

export default defineEventHandler(async (event) => {
  // Supprime le cookie de session
  setCookie(event, process.env.SESSION_COOKIE_NAME!, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0, // expiration immédiate
  })

  return { success: true, message: 'Déconnecté' }
})
