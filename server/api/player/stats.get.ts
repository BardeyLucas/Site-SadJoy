import { defineEventHandler, getCookie } from 'h3'

export default defineEventHandler(async (event) => {
  const sessionTicket = getCookie(event, process.env.SESSION_COOKIE_NAME!)
  if (!sessionTicket) throw createError({ statusCode: 401, statusMessage: 'Non connecté' })

  const PlayFab = await import('playfab-sdk')
  PlayFab.settings({ titleId: process.env.PLAYFAB_TITLE_ID })

  const result = await new Promise<any>((resolve, reject) => {
  PlayFab.PlayFabClient.GetPlayerStatistics(
    { SessionTicket: sessionTicket } as any, // ✅ force TypeScript à accepter
    (err: any, res: any) => err ? reject(err) : resolve(res)
  )
})


  return { stats: result.data?.Statistics ?? [] }
})
