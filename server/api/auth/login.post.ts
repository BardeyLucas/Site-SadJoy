import { defineEventHandler, readBody, setCookie, createError } from 'h3'
import * as PlayFabSdk from 'playfab-sdk'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  if (!email || !password) {
    throw createError({ statusCode: 400, message: 'Email et mot de passe requis' })
  }

  // ⚡ Initialisation PlayFab
  PlayFabSdk.PlayFab.settings = {
    titleId: process.env.PLAYFAB_TITLE_ID || '',
    developerSecretKey: process.env.PLAYFAB_DEV_SECRET_KEY,
    productionUrl: 'https://107067.playfabapi.com',
    verticalName: ''
  }

  const PlayFabClient = PlayFabSdk.PlayFabClient

  const result = await new Promise<any>((resolve, reject) => {
    PlayFabClient.LoginWithEmailAddress(
      {
        Email: email,
        Password: password
        // TitleId non nécessaire, déjà défini dans settings
      },
      (err: any, res: any) => err ? reject(err) : resolve(res)
    )
  })

  // Stockage du SessionTicket en cookie httpOnly
  setCookie(event, 'SESSION_COOKIE_NAME', result.data.PlayFabId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24
    })


  return {
    success: true,
    player: {
      playFabId: result.data.PlayFabId,
      pseudo: result.data.InfoResultPayload?.PlayerProfile?.DisplayName ?? 'Player',
      email: result.data.InfoResultPayload?.PlayerProfile?.Email ?? 'Email'
    }
  }
})