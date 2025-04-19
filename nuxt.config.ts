// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  css: ['~/assets/css/main.css'],
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
  },
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/supabase',
    '@nuxtjs/color-mode',
  ],
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirectOptions: {
      login: '/login',
      callback: 'authentication/confirm',
      saveRedirectToCookie: true,
      exclude: ['authentication/login', 'authentication/register'],
    },
  },
})