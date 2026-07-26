export default defineNuxtConfig({
  compatibilityDate: "2026-07-26",
  devtools: { enabled: true },

  modules: [
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxt/eslint",
    "@nuxt/ui",
    "pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/seo",
  ],

  css: ["~/assets/css/main.css"],

  ui: {
    icons: ["lucide"],
  },
});
