// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,

  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    [
      "@nuxtjs/i18n",
      {
        defaultLocale: "ar",
        // defaultDirection: "rtl",
        langDir: "./locales/",
        locales: [
          {
            file: "en.js",
            code: "en",
            iso: "en-CA",
            name: "English",
            dir: "ltr",
          },
          {
            file: "ar.js",
            code: "ar",
            iso: "ar-EG",
            name: "Arabic",
            dir: "rtl",
          },
        ],
      },
    ],
    "@formkit/auto-animate/nuxt",
    "@sidebase/nuxt-auth",
    "@nuxtjs/i18n",
  ],

  auth: {
    baseURL: process.env.BASE_URL,
    provider: {
      type: "local",
      endpoints: {
        signIn: { path: "/admin/login", method: "post" },
        signOut: false,
        signUp: { path: "/admin/store", method: "post" },
        getSession: { path: "/admin", method: "get" },
        // refresh: { path: '/refresh', method: 'post' },
      },
      token: {
        signInResponseTokenPointer: "/response/token",
        maxAgeInSeconds: 34560000, // 400 days, the maximum allowed by the browser
      },
    },
  },

  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || "https://api.example.com/",
      envMode: process.env.envMode || "production",
    },
  },

  css: ["assets/css/custom.css"],

  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },

  compatibilityDate: "2024-08-05",
});