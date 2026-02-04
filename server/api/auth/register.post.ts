import { defineEventHandler, readBody, setCookie, createError } from 'h3'
import * as PlayFabSdk from 'playfab-sdk'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { pseudo, email, password } = body

  if (!pseudo || !email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Pseudo, email et mot de passe requis' })
  }

  PlayFabSdk.PlayFab.settings = {
    titleId: process.env.PLAYFAB_TITLE_ID || '',
    developerSecretKey: process.env.PLAYFAB_DEV_SECRET_KEY,
    productionUrl: 'https://107067.playfabapi.com',
    verticalName: ''
  }

  const PlayFabClient = PlayFabSdk.PlayFabClient

  let result
  try {
    result = await new Promise<any>((resolve, reject) => {
      PlayFabClient.RegisterPlayFabUser(
        {
          Username: pseudo,
          Email: email,
          Password: password,
          DisplayName: pseudo,
          RequireBothUsernameAndEmail: true
        },
        (err: any, res: any) => (err ? reject(err) : resolve(res))
      )
    })
  } catch (err: any) {
    // ⚡ Affiche tout l'objet erreur pour diagnostiquer
    console.error('Erreur PlayFab:', JSON.stringify(err, null, 2))
    
    // Renvoie un message clair au client
    throw createError({
      statusCode: err.code || 500,
      statusMessage: err.errorMessage || 'Erreur lors de l’inscription'
    })
  }

  setCookie(event, 'SESSION_COOKIE_NAME', result.data.PlayFabId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24
  })

  return {
    success: true,
    playFabId: result.data.PlayFabId,
    pseudo
  }
})
