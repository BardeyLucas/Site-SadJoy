import { getCookie } from 'h3'

export function getSessionTicket(event: any): string {
  const ticket = getCookie(event, process.env.SESSION_COOKIE_NAME!)
  if (!ticket) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Non authentifié'
    })
  }
  return ticket
}
