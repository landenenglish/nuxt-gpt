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
  ],

  css: ['~/assets/scss/main.scss'],

  primevue: {
    options: { unstyled: true },
    importPT: {
      as: 'lara',
      from: resolve(__dirname, './presets/lara/'),
    },
  },
})
