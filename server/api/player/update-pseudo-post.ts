import { defineEventHandler, readBody, getCookie, createError } from 'h3'
import * as PlayFabSdk from 'playfab-sdk'

export default defineEventHandler(async (event) => {
  const playFabId = getCookie(event, 'SESSION_COOKIE_NAME')
  if (!playFabId) {
    throw createError({ statusCode: 401, statusMessage: 'Non connecté' })
  }

  const body = await readBody(event)
  const { pseudo } = body

  if (!pseudo || typeof pseudo !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Pseudo invalide'
    })
  }

  if (!pseudo || pseudo.length < 3) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Pseudo trop court (3 caractères min)'
    })
  }

 if (pseudo.length > 20) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Pseudo trop long (20 caractères max)'
    })
  }

  PlayFabSdk.PlayFab.settings = {
    titleId: process.env.PLAYFAB_TITLE_ID || '',
    developerSecretKey: process.env.PLAYFAB_DEV_SECRET_KEY,
    productionUrl: 'https://107067.playfabapi.com',
    verticalName: ''
  }

  await new Promise((resolve, reject) => {
    PlayFabSdk.PlayFabAdmin.UpdateUserTitleDisplayName(
      {
        PlayFabId: playFabId,
        DisplayName: pseudo
      },
      (err: any, res: any) => (err ? reject(err) : resolve(res))
    )
  })

  return { success: true, pseudo }
})
