import { defineEventHandler, getCookie, createError, readBody } from 'h3'
import * as PlayFabSdk from 'playfab-sdk'

export default defineEventHandler(async (event) => {
  const playFabId = getCookie(event, 'PLAYFAB_ID')
  if (!playFabId) {
    throw createError({ statusCode: 401, statusMessage: 'Non connecté' })
  }

  const body = await readBody(event)
  const { avatarUrl } = body

  if (!avatarUrl || typeof avatarUrl !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'URL d’avatar invalide'
    })
  }

  PlayFabSdk.PlayFab.settings = {
    titleId: process.env.PLAYFAB_TITLE_ID || '',
    developerSecretKey: process.env.PLAYFAB_DEV_SECRET_KEY,
    productionUrl: 'https://107067.playfabapi.com',
    verticalName: ''
  }

  await new Promise((resolve, reject) => {
    PlayFabSdk.PlayFabClient.UpdateAvatarUrl(
      {
        ImageUrl: avatarUrl
      },
      (err: any, res: any) => (err ? reject(err) : resolve(res))
    )
  })

  return { success: true, avatarUrl }
})
