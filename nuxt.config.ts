// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    head: {
      title: 'Rently',
      meta: [
        {name: 'description', content: 'Rently - Rent or Own your dream house'}
      ]
    }
  }
})
