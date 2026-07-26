<!-- app/pages/privacy.vue -->
<script setup lang="ts">
useSeoMeta({
  title: "Политика конфиденциальности — Калькулятор юнит-экономики WB",
  description: "Политика конфиденциальности сайта unit-economics.",
  robots: "noindex, follow",
});
</script>

<template>
  <div class="max-w-2xl mx-auto p-6 space-y-6">
    <h1 class="text-2xl font-bold">Политика конфиденциальности</h1>
    <div class="space-y-4 text-gray-600 text-sm leading-relaxed">
      <p>Дата обновления: {{ new Date().toLocaleDateString("ru-RU") }}</p>
      <p>
        Настоящая Политика конфиденциальности описывает, как сайт [ваш-домен.ru]
        обрабатывает данные пользователей.
      </p>
      <h2 class="text-lg font-semibold text-gray-800 pt-2">
        1. Какие данные собираются
      </h2>
      <p>
        Сайт не собирает персональные данные пользователей. Введённые в
        калькулятор параметры (цены, категории, расходы) сохраняются
        исключительно локально в браузере пользователя (localStorage) и не
        передаются на сервер.
      </p>
      <h2 class="text-lg font-semibold text-gray-800 pt-2">
        2. Аналитика и cookies
      </h2>
      <p>
        [Впишите сюда, если подключите Яндекс.Метрику / Google Analytics — какие
        cookies используются и с какой целью.]
      </p>
      <h2 class="text-lg font-semibold text-gray-800 pt-2">3. Контакты</h2>
      <p>По вопросам обработки данных: [email].</p>
    </div>
  </div>
</template>
