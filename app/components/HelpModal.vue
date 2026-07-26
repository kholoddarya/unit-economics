<script setup lang="ts">
defineProps<{
  title?: string;
}>();

const emit = defineEmits<{
  close: [];
}>();
</script>

<template>
  <UModal :title="title || 'Справка'" @close="emit('close')">
    <template #body>
      <div class="space-y-4 text-gray-700">
        <section>
          <h3 class="font-semibold text-gray-900 mb-1 flex items-center gap-2">
            <UIcon name="lucide-chart-pie" class="w-5 h-5" />
            Что такое юнит-экономика?
          </h3>
          <p class="text-sm">
            Это расчёт прибыли с одной единицы товара с учётом всех расходов:
            себестоимости, комиссии маркетплейса, налога, логистики и рекламы.
          </p>
        </section>

        <section>
          <h3 class="font-semibold text-gray-900 mb-1 flex items-center gap-2">
            <UIcon name="lucide-tags" class="w-5 h-5" />
            Схемы работы
          </h3>
          <ul class="text-sm list-disc list-inside space-y-1">
            <li>
              <b>Fbw</b> — товар хранится на складе WB, доставка быстрая,
              комиссия выше
            </li>
            <li>
              <b>Fbs</b> — товар на вашем складе, вы сами отгружаете, комиссия
              ниже
            </li>
          </ul>
        </section>

        <section>
          <h3 class="font-semibold text-gray-900 mb-1 flex items-center gap-2">
            <UIcon name="lucide-lightbulb" class="w-5 h-5" />
            Как пользоваться
          </h3>
          <ol class="text-sm list-decimal list-inside space-y-1">
            <li>Выберите категорию товара</li>
            <li>Укажите цену продажи и себестоимость</li>
            <li>Добавьте расходы на логистику и рекламу</li>
            <li>Смотрите чистую прибыль и маржинальность</li>
          </ol>
        </section>

        <UAlert
          color="blue"
          variant="soft"
          title="Данные актуальны"
          description="Комиссии обновляются еженедельно на основе официальных тарифов WB."
        />
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end">
        <UButton label="Понятно" color="primary" @click="emit('close')" />
      </div>
    </template>
  </UModal>
</template>
