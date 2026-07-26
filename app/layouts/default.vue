<script setup lang="ts">
const isHelpOpen = ref(false);
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-50/50 dark:bg-gray-950">
    <!-- Фиксированная шапка с эффектом размытия -->
    <UHeader
      class="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md"
    >
      <template #left>
        <div
          class="flex items-center gap-2 font-bold text-xl text-primary-600 dark:text-primary-400"
        >
          <UIcon name="i-lucide-calculator" class="w-6 h-6" />
          <span>Unit Economics</span>
        </div>
      </template>
      <template #right>
        <UNavigationMenu
          :items="[
            { label: 'Калькулятор', to: '/' },
            { label: 'История', to: '/history' },
            { label: 'Тарифы WB', to: '/tariffs' },
          ]"
          class="hidden md:flex"
        />
        <!-- Мобильное меню можно добавить позже, пока оставим кнопку помощи -->
        <UButton
          variant="ghost"
          color="neutral"
          icon="i-lucide-circle-help"
          @click="isHelpOpen = true"
          aria-label="Помощь"
        />
      </template>
    </UHeader>

    <main class="flex-1 w-full">
      <slot />
    </main>

    <footer
      class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-6 mt-auto"
    >
      <div
        class="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400"
      >
        <p>
          © {{ new Date().getFullYear() }} Калькулятор юнит-экономики для
          селлеров Wildberries
        </p>
        <div class="flex gap-4">
          <NuxtLink
            to="/privacy"
            class="hover:text-primary-600 transition-colors"
            >Политика конфиденциальности</NuxtLink
          >
          <NuxtLink to="/about" class="hover:text-primary-600 transition-colors"
            >О проекте</NuxtLink
          >
        </div>
      </div>
    </footer>

    <HelpModal
      v-model:open="isHelpOpen"
      title="Как пользоваться калькулятором"
    />
  </div>
</template>
