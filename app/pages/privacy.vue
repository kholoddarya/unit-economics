<script setup lang="ts">
useSeoMeta({
  title: "Политика конфиденциальности — Калькулятор юнит-экономики WB",
  description: "Политика конфиденциальности сайта unit-economics.",
  robots: "noindex, follow",
});
</script>

<template>
  <div class="max-w-3xl mx-auto p-6 md:p-10 space-y-8">
    <header class="border-b border-gray-200 dark:border-gray-800 pb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-50">
        Политика конфиденциальности
      </h1>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
        Дата последнего обновления:
        {{
          new Date().toLocaleDateString("ru-RU", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        }}
      </p>
    </header>

    <div class="space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed">
      <section class="space-y-3">
        <h2
          class="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2"
        >
          <UIcon name="i-lucide-file-text" class="w-5 h-5 text-primary-500" />
          1. Общие положения
        </h2>
        <p>
          Настоящая Политика конфиденциальности описывает, как сайт обрабатывает
          данные пользователей. Используя данный сервис, вы соглашаетесь с
          условиями, изложенными в этом документе.
        </p>
      </section>

      <section class="space-y-3">
        <h2
          class="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2"
        >
          <UIcon name="i-lucide-shield" class="w-5 h-5 text-primary-500" />
          2. Какие данные собираются
        </h2>
        <p>
          Сайт <b>не собирает</b> персональные данные пользователей. Введённые в
          калькулятор параметры (цены, категории, расходы) сохраняются
          исключительно локально в браузере пользователя (через механизм
          <code
            class="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-gray-800 dark:text-gray-200"
            >localStorage</code
          >) и не передаются на сервер.
        </p>
      </section>

      <section class="space-y-3">
        <h2
          class="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2"
        >
          <UIcon name="i-lucide-cookie" class="w-5 h-5 text-primary-500" />
          3. Аналитика и cookies
        </h2>
        <p>
          В настоящее время сайт не использует сторонние системы аналитики
          (такие как Яндекс.Метрика или Google Analytics) и не устанавливает
          отслеживающие cookies.
        </p>
      </section>

      <section class="space-y-3">
        <h2
          class="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2"
        >
          <UIcon name="i-lucide-mail" class="w-5 h-5 text-primary-500" />
          4. Контакты
        </h2>
        <p>
          По любым вопросам, связанным с обработкой данных или работой сервиса,
          вы можете связаться с разработчиком:
          <br />
          <a
            href="https://t.me/KholodDarya"
            class="text-primary-600 dark:text-primary-400 hover:underline font-medium inline-flex items-center gap-1 mt-1"
          >
            <UIcon name="i-lucide-send" class="w-4 h-4" />
            Telegram: @KholodDarya
          </a>
        </p>
      </section>
    </div>
  </div>
</template>
