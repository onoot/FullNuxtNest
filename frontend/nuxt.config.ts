// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/styles/main.scss'],
  modules: [],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "sass:math"; @use "sass:color";'
        }
      }
    }
  },

  app: {
    head: {
      title: 'Управление продуктами питания',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          hid: 'description', 
          name: 'description', 
          content: 'Система управления продуктами питания' 
        }
      ]
    }
  },

  compatibilityDate: '2025-03-29'
})