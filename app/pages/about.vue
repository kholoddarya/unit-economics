<!-- app/pages/about.vue -->
<script setup lang="ts">
useSeoMeta({
  title: "О проекте — Калькулятор юнит-экономики для Wildberries",
  description:
    "Бесплатный инструмент для расчёта прибыли и рентабельности товаров на Wildberries. Как он устроен и как связаться с автором.",
});
</script>

<template>
  <div class="max-w-2xl mx-auto p-6 space-y-6">
    <h1 class="text-2xl font-bold">О проекте</h1>

    <div class="space-y-4 text-gray-600">
      <p>
        Этот калькулятор помогает продавцам Wildberries быстро посчитать
        реальную прибыль с продажи товара — с учётом комиссии маркетплейса,
        логистики, рекламных расходов и налогов.
      </p>
      <p>
        Комиссии WB подтягиваются из официальной таблицы коэффициентов
        вознаграждения (КВВ), которую публикует сам маркетплейс — данные
        периодически обновляются автоматически.
      </p>
      <p>
        Все расчёты хранятся только в вашем браузере (localStorage) — сервер их
        не видит и никуда не отправляет.
      </p>
      <p>
        Нашли неточность в расчётах или в комиссиях? Есть предложение по
        улучшению калькулятора? Пишите:
      </p>
      <ul class="list-disc list-inside space-y-1">
        <li>
          Telegram:
          <a href="https://t.me/KholodDarya" class="text-primary-600 underline"
            >@KholodDarya</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>
