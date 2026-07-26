<script setup lang="ts">
useSeoMeta({
  title: "О проекте — Калькулятор юнит-экономики для Wildberries",
  description:
    "Бесплатный инструмент для расчёта прибыли и рентабельности товаров на Wildberries. Как он устроен и как связаться с автором.",
});
</script>

<template>
  <div class="max-w-3xl mx-auto p-6 md:p-10 space-y-8">
    <header class="space-y-3">
      <h1
        class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50"
      >
        О проекте
      </h1>
      <p class="text-lg text-gray-500 dark:text-gray-400">
        Простой и точный инструмент для принятия финансовых решений.
      </p>
    </header>

    <div class="grid gap-6">
      <UCard class="shadow-sm border-gray-200 dark:border-gray-800">
        <div class="flex items-start gap-4">
          <div
            class="p-3 bg-primary-50 dark:bg-primary-900/30 rounded-lg text-primary-600 dark:text-primary-400"
          >
            <UIcon name="i-lucide-target" class="w-6 h-6" />
          </div>
          <div class="space-y-2">
            <h2 class="text-xl font-semibold">Зачем этот калькулятор?</h2>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              Он помогает продавцам Wildberries быстро посчитать реальную
              прибыль с продажи товара — с учётом комиссии маркетплейса,
              логистики, рекламных расходов и налогов. Никаких скрытых
              параметров.
            </p>
          </div>
        </div>
      </UCard>

      <UCard class="shadow-sm border-gray-200 dark:border-gray-800">
        <div class="flex items-start gap-4">
          <div
            class="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400"
          >
            <UIcon name="i-lucide-database" class="w-6 h-6" />
          </div>
          <div class="space-y-2">
            <h2 class="text-xl font-semibold">Откуда данные?</h2>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              Комиссии WB подтягиваются из официальной таблицы коэффициентов
              вознаграждения (КВВ). Данные периодически обновляются
              автоматически через скрипт.
            </p>
          </div>
        </div>
      </UCard>

      <UCard class="shadow-sm border-gray-200 dark:border-gray-800">
        <div class="flex items-start gap-4">
          <div
            class="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400"
          >
            <UIcon name="i-lucide-shield-check" class="w-6 h-6" />
          </div>
          <div class="space-y-2">
            <h2 class="text-xl font-semibold">Безопасность данных</h2>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              Все расчёты хранятся
              <b>только в вашем браузере</b> (localStorage). Сервер их не видит,
              не сохраняет и никуда не отправляет.
            </p>
          </div>
        </div>
      </UCard>
    </div>

    <UCard
      class="bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800"
    >
      <div
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <h3 class="font-semibold text-primary-900 dark:text-primary-100">
            Нашли неточность или есть идея?
          </h3>
          <p class="text-sm text-primary-700 dark:text-primary-300">
            Буду рада обратной связи и предложениям по улучшению.
          </p>
        </div>
        <UButton
          to="https://t.me/KholodDarya"
          target="_blank"
          color="primary"
          icon="i-lucide-send"
          class="font-medium"
        >
          Написать в Telegram
        </UButton>
      </div>
    </UCard>
  </div>
</template>
