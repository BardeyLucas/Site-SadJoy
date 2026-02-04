import { defineEventHandler, getCookie, createError } from 'h3'
import * as PlayFabSdk from 'playfab-sdk'

const PlayFabAdmin = PlayFabSdk.PlayFabAdmin as any

export default defineEventHandler(async (event) => {
  const playFabId = getCookie(event, 'SESSION_COOKIE_NAME')
  if (!playFabId) throw createError({ statusCode: 401, statusMessage: 'Non connecté' })

  PlayFabSdk.PlayFab.settings = {
    titleId: process.env.PLAYFAB_TITLE_ID || '',
    developerSecretKey: process.env.PLAYFAB_DEV_SECRET_KEY,
    productionUrl: 'https://107067.playfabapi.com',
    verticalName: ''
  }

  try {
    await new Promise((resolve, reject) => {
      PlayFabAdmin.DeletePlayer(
        { PlayFabId: playFabId },
        (err: any, res: any) => (err ? reject(err) : resolve(res))
      )
    })

    return { success: true }
  } catch (err) {
    throw createError({ statusCode: 500, statusMessage: 'Impossible de supprimer le compte' })
  }
})
