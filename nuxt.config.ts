// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css : ['~/styles/main.scss'],
  modules: ['@nuxtjs/tailwindcss', '@nuxt/ui', '@nuxtjs/google-fonts', '@nuxtjs/sanity'],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
    // and more...
  },

  sanity: {
    projectId: 'nhw1hulo',
    dataset: 'production',
    visualEditing: {
      token: process.env.NUXT_SANITY_API_TOKEN,
      studioUrl: process.env.NUXT_STUDIO_URL,
      stega: false
    }
  },

  googleFonts: {
    families: {
      'Josefin Sans': [100, 200, 300, 400, 500, 600, 700],
      Arimo: [100, 200, 300, 400, 500, 600, 700],
    },
    display: 'swap',
    preconnect: true,
    download: true,
  },
})