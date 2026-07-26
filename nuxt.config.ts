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

  site: {
    url: "https://wb-economics.ru", // ← ЗАМЕНИТЕ на ваш домен
    name: "Калькулятор юнит-экономики для Wildberries",
    description:
      "Бесплатный онлайн-калькулятор для селлеров Wildberries: расчёт прибыли, комиссии, логистики, налогов и рентабельности товара с актуальными тарифами WB.",
    defaultLocale: "ru",
    identity: {
      type: "Organization",
      name: "Unit Economics",
      url: "https://wb-economics.ru",
    },
  },

  sitemap: {
    enabled: true,
    sources: ["/api/__sitemap__/urls"], // автогенерация из страниц
    exclude: ["/privacy"], // приватные страницы не индексируем
    defaults: {
      changefreq: "weekly",
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
  },

  robots: {
    enabled: true,
    disallow: ["/api/", "/privacy"],
    sitemap: ["/sitemap.xml"],
  },

  schemaOrg: {
    identity: {
      type: "Organization",
      name: "Unit Economics",
      url: "https://wb-economics.ru",
      logo: "https://wb-economics.ru/logo.iso",
    },
  },

  ogImage: {
    enabled: true,
    defaults: {
      component: "OgImage",
      width: 1200,
      height: 630,
    },
  },

  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      htmlAttrs: {
        lang: "ru",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/logo.ico" }],
    },
  },
});
