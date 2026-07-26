<!-- app/pages/tariffs.vue -->
<script setup lang="ts">
import commissionsData from "~/assets/data/wb-commissions.json";

interface CommissionRow {
  parentCategory: string;
  subject: string;
  fbw: number | null;
  fbs: number | null;
  dbs: number | null;
  edbs: number | null;
  cnc: number | null;
  booking: number | null;
}

const rows = (commissionsData.rows ?? []) as CommissionRow[];
const search = ref("");

const filteredRows = computed(() => {
  if (!search.value.trim()) return rows;
  const q = search.value.toLowerCase();
  return rows.filter(
    (r) =>
      r.subject.toLowerCase().includes(q) ||
      r.parentCategory.toLowerCase().includes(q),
  );
});

const columns = [
  { accessorKey: "parentCategory", header: "Родительская категория" },
  { accessorKey: "subject", header: "Предмет" },
  { accessorKey: "fbw", header: "FBW, %" },
  { accessorKey: "fbs", header: "FBS, %" },
  { accessorKey: "dbs", header: "DBS, %" },
  { accessorKey: "cnc", header: "C&C, %" },
];

function fmt(v: number | null) {
  return v == null ? "—" : `${v}%`;
}

useSeoMeta({
  title:
    "Таблица комиссий Wildberries 2026 — актуальные тарифы WB по категориям",
  description:
    "Актуальная таблица комиссий и коэффициентов вознаграждения (КВВ) Wildberries по всем категориям товаров: FBW, FBS, DBS. Обновляется автоматически из официального источника.",
});
</script>

<template>
  <div class="max-w-5xl mx-auto p-6 space-y-6">
    <header class="space-y-2">
      <h1 class="text-2xl font-bold">
        Актуальные тарифы и комиссии Wildberries
      </h1>
      <p class="text-gray-500">
        Данные обновляются из официальной таблицы КВВ Wildberries.
        <span v-if="commissionsData.updatedAt">
          Последнее обновление:
          {{ new Date(commissionsData.updatedAt).toLocaleDateString("ru-RU") }}.
        </span>
      </p>
    </header>

    <UInput
      v-model="search"
      icon="i-lucide-search"
      placeholder="Поиск по названию предмета или категории"
      class="max-w-md"
    />

    <UTable :data="filteredRows" :columns="columns" class="w-full">
      <template #fbw-cell="{ row }">{{ fmt(row.original.fbw) }}</template>
      <template #fbs-cell="{ row }">{{ fmt(row.original.fbs) }}</template>
      <template #dbs-cell="{ row }">{{ fmt(row.original.dbs) }}</template>
      <template #cnc-cell="{ row }">{{ fmt(row.original.cnc) }}</template>
    </UTable>

    <p class="text-sm text-gray-400">
      Найдено позиций: {{ filteredRows.length }} из {{ rows.length }}
    </p>
  </div>
</template>
