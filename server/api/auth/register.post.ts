import { defineEventHandler, readBody, createError } from 'h3'
import * as PlayFabSdk from 'playfab-sdk'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { pseudo, email, password } = body

  if (!pseudo || !email || !password) {
    throw createError({ statusCode: 400, message: 'Pseudo, email et mot de passe requis' })
  }

  // ⚡ Ici on initialise PlayFab pour que titleId soit défini
  PlayFabSdk.PlayFab.settings = {
    titleId: process.env.PLAYFAB_TITLE_ID || '',
    developerSecretKey: process.env.PLAYFAB_DEV_SECRET_KEY,
    productionUrl: 'https://107067.playfabapi.com',
    verticalName: ''
  }

  const PlayFabClient = PlayFabSdk.PlayFabClient

  const result = await new Promise<any>((resolve, reject) => {
    PlayFabClient.RegisterPlayFabUser(
      {
        Username: pseudo,
        Email: email,
        Password: password,
        RequireBothUsernameAndEmail: true
        // TitleId n'est plus nécessaire ici car settings.titleId est défini
      },
      (err: any, res: any) => err ? reject(err) : resolve(res)
    )
  })

  return {
    success: true,
    playFabId: result.data.PlayFabId,
    pseudo
  }
})