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
  toast.add({ title: "Расчёт удалён" });
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
  <div class="max-w-5xl mx-auto p-6 space-y-6">
    <header class="space-y-2">
      <h1 class="text-2xl font-bold">История расчётов</h1>
      <p class="text-gray-500">
        Все расчёты сохраняются локально в браузере, отправка на сервер не
        происходит.
      </p>
    </header>

    <UCard v-if="store.items.length === 0">
      <p class="text-gray-500 text-center py-8">
        Пока нет сохранённых расчётов.
        <NuxtLink to="/" class="text-primary-600 underline"
          >Перейти к калькулятору →</NuxtLink
        >
      </p>
    </UCard>

    <UTable v-else :data="store.items" :columns="columns" class="w-full">
      <template #createdAt-cell="{ row }">
        {{ formatDate(row.original.createdAt) }}
      </template>
      <template #subject-cell="{ row }">
        {{ row.original.subject?.label ?? "—" }}
      </template>
      <template #scheme-cell="{ row }">
        {{ schemeLabels[row.original.scheme] }}
      </template>
      <template #sellPrice-cell="{ row }">
        {{ row.original.sellPrice.toFixed(2) }} ₽
      </template>
      <template #profit-cell="{ row }">
        <span
          :class="row.original.profit >= 0 ? 'text-green-600' : 'text-red-600'"
        >
          {{ row.original.profit.toFixed(2) }} ₽
        </span>
      </template>
      <template #marginPercent-cell="{ row }">
        {{ row.original.marginPercent.toFixed(1) }}%
      </template>
      <template #actions-cell="{ row }">
        <div class="flex gap-2 justify-end">
          <UButton
            size="xs"
            variant="soft"
            color="secondary"
            @click="load(row.original.id)"
          >
            Загрузить
          </UButton>
          <UButton
            size="xs"
            variant="soft"
            color="error"
            @click="remove(row.original.id)"
          >
            Удалить
          </UButton>
        </div>
      </template>
    </UTable>
  </div>
</template>
