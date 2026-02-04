import { defineEventHandler, getCookie } from 'h3'
import * as PlayFabSdk from 'playfab-sdk'

export default defineEventHandler(async (event) => {

    // 🔹 Debug des variables d'environnement
  console.log('PLAYFAB_TITLE_ID:', process.env.PLAYFAB_TITLE_ID ? 'OK' : 'MISSING')
  console.log('PLAYFAB_DEV_SECRET_KEY:', process.env.PLAYFAB_DEV_SECRET_KEY ? 'OK' : 'MISSING')
  console.log('SESSION_COOKIE_NAME:', process.env.SESSION_COOKIE_NAME ? 'OK' : 'MISSING')

  const playFabId = getCookie(event, 'SESSION_COOKIE_NAME')
  if (!playFabId) return { user: false, pseudo: '', email: '' }

  PlayFabSdk.PlayFab.settings = {
    titleId: process.env.PLAYFAB_TITLE_ID || '',
    developerSecretKey: process.env.PLAYFAB_DEV_SECRET_KEY,
    productionUrl: `https://${process.env.PLAYFAB_TITLE_ID}.playfabapi.com`,
    verticalName: ''
  }

  const PlayFabClient = PlayFabSdk.PlayFabClient

  try {
    // ⚡ Récupération du DisplayName
    const profileInfo: any = await new Promise((resolve, reject) => {
  PlayFabClient.GetPlayerProfile(
    {
      PlayFabId: playFabId,
      ProfileConstraints: {
        ShowDisplayName: true,                  // ✅ ce qu'on veut
        ShowAvatarUrl: true,
        ShowBannedUntil: false,
        ShowCampaignAttributions: false,
        ShowContactEmailAddresses: false,
        ShowCreated: false,
        ShowExperimentVariants: false,
        ShowLastLogin: false,
        ShowLinkedAccounts: false,
        ShowLocations: false,
        ShowMemberships: false,
        ShowOrigination: false,
        ShowPushNotificationRegistrations: false,
        ShowStatistics: false,
        ShowTags: false,
        ShowTotalValueToDateInUsd: false,
        ShowValuesToDate: false
      }
    },
    (err, res) => (err ? reject(err) : resolve(res))
  )
})

const pseudo = profileInfo?.data?.PlayerProfile?.DisplayName || ''
const avatar = profileInfo?.data?.PlayerProfile?.AvatarUrl || ''


    // ⚡ Récupération de l'email
    const accountInfo: any = await new Promise((resolve, reject) => {
      PlayFabClient.GetAccountInfo(
        { PlayFabId: playFabId },
        (err, res) => (err ? reject(err) : resolve(res))
      )
    })
    const email = accountInfo?.data?.AccountInfo?.PrivateInfo?.Email || ''

    return { user: true, pseudo, email, avatar }
  } catch (err: any) {
    if (playFabId) console.warn('Erreur PlayFab checkAuth:', err)
    return { user: false, pseudo: '', email: '', avatar: ''}
  }
})
