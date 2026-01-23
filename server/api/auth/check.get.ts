import { defineEventHandler, getCookie, createError } from 'h3'

export default defineEventHandler((event) => {
  const sessionTicket = getCookie(event, process.env.SESSION_COOKIE_NAME!)
  if (!sessionTicket) {
    throw createError({ statusCode: 401, statusMessage: 'Non connecté' })
  }
  return { success: true }
})
