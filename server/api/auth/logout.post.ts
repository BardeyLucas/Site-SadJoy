import { defineEventHandler, setCookie } from 'h3'

export default defineEventHandler((event) => {
  setCookie(event, 'SESSION_COOKIE_NAME', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0 // 💥 suppression réelle
  })

  return { success: true }
})
