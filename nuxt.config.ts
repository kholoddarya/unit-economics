export default defineNuxtConfig({
  compatibilityDate: '2026-07-26', // актуальная дата
  future: {
    compatibilityVersion: 4, // явно включаем Nuxt 4
  },
  devtools: { enabled: true },

  ssr: true,

  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      charset: 'utf-8',ё
      viewport: 'width=device-width, initial-scale=1',
      title: 'Калькулятор юнит-экономики для селлеров WB и Ozon',
      meta: [
        { name: 'description', content: 'Бесплатный онлайн-калькулятор юнит-экономики для селлеров Wildberries и Ozon. Рассчитай прибыль, комиссию, логистику и окупаемость товара за 2 минуты.' },
        { name: 'yandex-verification', content: 'СЮДА_ПОЗЖЕ_ВСТАВИТЬ_КОД_ИЗ_ВЕБМАСТЕРА' },
      ],
    },
  },

  modules: [
    '@nuxtjs/seo', // sitemap, robots, og-теги из коробки
  ],

  site: {
    url: 'https://your-domain.com', // поменять потом
    name: 'Калькулятор юнит-экономики',
  },ё
})