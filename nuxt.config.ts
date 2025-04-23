// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    css: ['~/assets/css/main.css'],
    colorMode: {
        preference: 'system',
        fallback: 'light',
        classSuffix: '',
    },
    devtools: {
        enabled: true,

        timeline: {
            enabled: true,
        },
    },
    modules: [
      '@nuxt/ui',
      '@nuxtjs/supabase',
      '@nuxtjs/color-mode',
      '@pinia/nuxt',
    ],
    pinia: {
        storesDirs: ['./stores/**'],
    },
    supabase: {
        url: process.env.SUPABASE_URL,
        key: process.env.SUPABASE_KEY,
        redirectOptions: {
            login: '/auth/login',
            callback: '/auth/confirm',
            saveRedirectToCookie: true,
            exclude: ['/auth/login', '/auth/register'],
        },
    },
})