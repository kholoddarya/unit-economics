<script setup lang="ts">
const isHelpOpen = ref(false);
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <UHeader>
      <template #left>
        <div>Калькулятор юнит-экономики</div>
      </template>
      <template #right>
        <UNavigationMenu
          :items="[
            { label: 'Калькулятор', to: '/' },
            { label: 'История', to: '/history' },
            { label: 'Тарифы WB', to: '/tariffs' },
            { label: 'Наши политики', to: '/privacy' },
            { label: 'О проекте', to: '/about' },
          ]"
        />
      </template>
    </UHeader>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="bg-white border-t border-gray-200 py-4">
      <div class="max-w-5xl mx-auto px-4 text-center text-sm text-gray-500">
        2026 Калькулятор юнит-экономики для селлеров Wildberries
      </div>
    </footer>

    <!-- Модалка подключена напрямую -->
    <HelpModal
      v-model:open="isHelpOpen"
      title="Как пользоваться калькулятором"
    />
  </div>
</template>
