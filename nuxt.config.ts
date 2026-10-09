// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/tailwind.css'],
  typescript: {
    strict: true,
  },
  app: {
    head: {
      title: 'Mini Memory — Construye tu primera web',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Memory Game construido con Nuxt 4 + Vue 3 + TailwindCSS' },
      ],
    },
  },
})
