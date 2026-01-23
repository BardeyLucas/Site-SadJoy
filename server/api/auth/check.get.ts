// server/api/auth/check.get.ts
import { defineEventHandler, getCookie } from 'h3'
import * as PlayFabSdk from 'playfab-sdk'

export default defineEventHandler(async (event) => {
  // Récupération du SessionTicket depuis le cookie
   const playFabId = getCookie(event, 'PLAYFAB_ID')
  if (!playFabId) return { user: false, pseudo: '', email: '' }


  // ⚡ Configuration PlayFab
  PlayFabSdk.PlayFab.settings = {
    titleId: process.env.PLAYFAB_TITLE_ID || '',
    developerSecretKey: process.env.PLAYFAB_DEV_SECRET_KEY,
    productionUrl: 'https://107067.playfabapi.com',
    verticalName: ''
  }

  const PlayFabClient = PlayFabSdk.PlayFabClient

  try {
    const accountInfo: any = await new Promise((resolve, reject) => {
        PlayFabClient.GetAccountInfo(
        { PlayFabId: playFabId },
        (err, res) => (err ? reject(err) : resolve(res))
        )
    })
    const pseudo = accountInfo?.data?.AccountInfo?.Username || ''
    const email = accountInfo?.data?.AccountInfo?.PrivateInfo?.Email || ''
    return { user: true, pseudo, email }
    } catch (err: any) {
    // ⚡ seulement log si playFabId existait
    if (playFabId) console.warn('Erreur PlayFab checkAuth:', err)
    return { user: false, pseudo: '', email: '' }
    }
})
