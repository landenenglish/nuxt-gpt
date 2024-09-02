import { resolve } from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-09-01',

  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module',
    '@nuxtjs/color-mode',
  ],

  css: ['~/assets/scss/main.scss'],

  primevue: {
    options: { unstyled: true },
    importPT: {
      as: 'aura',
      from: resolve(__dirname, './presets/aura/'),
    },
  },

  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
        },
      ],
    },
  },
})
