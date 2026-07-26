<script setup lang="ts">
import { useCalculationsStore } from "~/stores/calculations";

const store = useCalculationsStore();
const toast = useToast();

const schemeLabels: Record<string, string> = {
  fbw: "FBW (склад WB)",
  fbs: "FBS (маркетплейс)",
  dbs: "DBS (витрина/ПВЗ)",
};

const columns = [
  { accessorKey: "createdAt", header: "Дата" },
  { accessorKey: "subject", header: "Товар" },
  { accessorKey: "scheme", header: "Схема" },
  { accessorKey: "sellPrice", header: "Цена продажи" },
  { accessorKey: "profit", header: "Прибыль" },
  { accessorKey: "marginPercent", header: "Маржа" },
  { id: "actions", header: "" },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("ru-RU", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

function remove(id: string) {
  store.remove(id);
  toast.add({ title: "Расчёт удалён", color: "neutral" });
}

function clearAll() {
  if (confirm("Вы уверены, что хотите удалить все сохранённые расчёты?")) {
    store.clear();
    toast.add({ title: "История очищена", color: "neutral" });
  }
}

function load(id: string) {
  navigateTo({ path: "/", query: { load: id } });
}

useSeoMeta({
  title: "История расчётов юнит-экономики — Калькулятор WB",
  description: "Сохранённые расчёты юнит-экономики для товаров на Wildberries.",
});
</script>

<template>
  <div class="max-w-6xl mx-auto p-6 md:p-8 space-y-6">
    <header
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div class="space-y-1">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-50">
          История расчётов
        </h1>
        <p
          class="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1.5"
        >
          <UIcon name="i-lucide-hard-drive" class="w-4 h-4" />
          Все расчёты сохраняются локально в вашем браузере.
        </p>
      </div>
      <UButton
        v-if="store.items.length > 0"
        variant="outline"
        color="error"
        icon="i-lucide-trash-2"
        @click="clearAll"
      >
        Очистить всё
      </UButton>
    </header>

    <UCard
      v-if="store.items.length === 0"
      class="shadow-sm border-dashed border-2 border-gray-200 dark:border-gray-800"
    >
      <div
        class="flex flex-col items-center justify-center py-12 text-center space-y-4"
      >
        <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-full">
          <UIcon name="i-lucide-folder-open" class="w-10 h-10 text-gray-400" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Пока нет сохранённых расчётов
          </h3>
          <p class="text-gray-500 dark:text-gray-400 mt-1 max-w-sm">
            Посчитайте юнит-экономику на главной странице и нажмите «Сохранить
            расчёт», чтобы он появился здесь.
          </p>
        </div>
        <UButton to="/" color="primary" icon="i-lucide-plus" class="mt-2">
          Перейти к калькулятору
        </UButton>
      </div>
    </UCard>

    <UCard
      v-else
      class="shadow-sm border-gray-200 dark:border-gray-800 overflow-hidden"
    >
      <UTable
        :data="store.items"
        :columns="columns"
        class="w-full"
        :ui="{
          td: 'whitespace-nowrap',
        }"
      >
        <template #createdAt-cell="{ row }">
          <span class="text-gray-500 dark:text-gray-400 text-sm">{{
            formatDate(row.original.createdAt)
          }}</span>
        </template>
        <template #subject-cell="{ row }">
          <span class="font-medium text-gray-900 dark:text-gray-100">{{
            row.original.subject?.label || "—"
          }}</span>
        </template>
        <template #scheme-cell="{ row }">
          <UBadge variant="soft" color="neutral" class="text-xs">
            {{ schemeLabels[row.original.scheme] || row.original.scheme }}
          </UBadge>
        </template>
        <template #sellPrice-cell="{ row }">
          {{ row.original.sellPrice.toFixed(2) }} ₽
        </template>
        <template #profit-cell="{ row }">
          <span
            :class="
              row.original.profit >= 0
                ? 'text-green-600 dark:text-green-400 font-semibold'
                : 'text-red-600 dark:text-red-400 font-semibold'
            "
          >
            {{ row.original.profit.toFixed(2) }} ₽
          </span>
        </template>
        <template #marginPercent-cell="{ row }">
          {{ row.original.marginPercent.toFixed(1) }}%
        </template>
        <template #actions-cell="{ row }">
          <div class="flex gap-2 justify-end">
            <UTooltip text="Загрузить в калькулятор">
              <UButton
                size="xs"
                variant="ghost"
                color="primary"
                icon="i-lucide-rotate-ccw"
                @click="load(row.original.id)"
              />
            </UTooltip>
            <UTooltip text="Удалить">
              <UButton
                size="xs"
                variant="ghost"
                color="error"
                icon="i-lucide-trash-2"
                @click="remove(row.original.id)"
              />
            </UTooltip>
          </div>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
