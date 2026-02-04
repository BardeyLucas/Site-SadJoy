import { defineEventHandler, getCookie, createError } from 'h3'
import { createClient } from '@sanity/client'
import * as PlayFabSdk from 'playfab-sdk'
import formidable from 'formidable'
import fs from 'fs'

const sanityClient = createClient({
  projectId: 'nhw1hulo',
  dataset: 'production',
  apiVersion: '2026-01-02',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

export default defineEventHandler(async (event) => {
  const playFabId = getCookie(event, 'SESSION_COOKIE_NAME')
  if (!playFabId) throw createError({ statusCode: 401, statusMessage: 'Non connecté' })

  // On parse le formulaire
  const form = formidable({ multiples: false, keepExtensions: true })

  const { files } = await new Promise<{ files: any }>((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if (err) reject(err)
      else resolve({ files })
    })
  })

  let avatarFile = files.avatar
  if (!avatarFile) throw createError({ statusCode: 400, statusMessage: 'Fichier avatar manquant' })

  if (Array.isArray(avatarFile)) avatarFile = avatarFile[0]

  // On lit le fichier temporaire en Buffer
  const filePath = avatarFile.filepath || avatarFile.filePath
  if (!filePath) throw createError({ statusCode: 500, statusMessage: 'Impossible de lire le fichier avatar' })

  const fileBuffer = fs.readFileSync(filePath)

  if (!fileBuffer) throw createError({ statusCode: 500, statusMessage: 'Impossible de convertir le fichier en Buffer' })

  // Upload sur Sanity
  const uploaded = await sanityClient.assets.upload('image', fileBuffer, {
    filename: avatarFile.originalFilename || 'avatar.png',
  })

  if (!uploaded?.url) throw createError({ statusCode: 500, statusMessage: 'Échec upload sur Sanity' })

  const avatarUrl = uploaded.url

  // Mettre à jour PlayFab
  PlayFabSdk.PlayFab.settings = {
    titleId: process.env.PLAYFAB_TITLE_ID || '',
    developerSecretKey: process.env.PLAYFAB_DEV_SECRET_KEY,
    productionUrl: `https://${process.env.PLAYFAB_TITLE_ID}.playfabapi.com`,
    verticalName: '',
  }

  await new Promise((resolve, reject) => {
    PlayFabSdk.PlayFabClient.UpdateAvatarUrl(
      { ImageUrl: avatarUrl },
      (err: any, res: any) => (err ? reject(err) : resolve(res))
    )
  })

  return { success: true, avatarUrl }
})
