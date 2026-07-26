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

const rawData = commissionsData as any;
const rows = (
  Array.isArray(rawData) ? rawData : (rawData.rows ?? rawData.data ?? [])
) as CommissionRow[];

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
    "Актуальная таблица комиссий и коэффициентов вознаграждения (КВВ) Wildberries по всем категориям товаров: FBW, FBS, DBS.",
});
</script>

<template>
  <div class="max-w-6xl mx-auto p-6 md:p-8 space-y-6">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-50">
        Актуальные тарифы и комиссии Wildberries
      </h1>
      <p class="text-gray-500 dark:text-gray-400 flex items-center gap-2">
        <UIcon name="i-lucide-refresh-cw" class="w-4 h-4" />
        Данные обновляются из официальной таблицы КВВ Wildberries.
        <span
          v-if="commissionsData.updatedAt"
          class="font-medium text-gray-700 dark:text-gray-300"
        >
          (Последнее обновление:
          {{ new Date(commissionsData.updatedAt).toLocaleDateString("ru-RU") }})
        </span>
      </p>
    </header>

    <!-- Липкий поиск для удобства при скролле длинной таблицы -->
    <div
      class="sticky top-20 z-30 bg-gray-50/95 dark:bg-gray-950/95 backdrop-blur-sm py-2"
    >
      <UInput
        v-model="search"
        icon="i-lucide-search"
        placeholder="Поиск по названию предмета или категории..."
        class="w-full md:max-w-md shadow-sm"
        size="lg"
      />
    </div>

    <UCard
      class="shadow-sm border-gray-200 dark:border-gray-800 overflow-hidden"
    >
      <!-- ВАШЕ ПРЕДПОЧТЕНИЕ: Таблица занимает 100% ширины -->
      <UTable
        :data="filteredRows"
        :columns="columns"
        class="w-full"
        :ui="{
          th: 'whitespace-nowrap bg-gray-50 dark:bg-gray-900 font-semibold text-gray-700 dark:text-gray-300',
          td: 'whitespace-nowrap text-gray-600 dark:text-gray-400',
        }"
      >
        <template #fbw-cell="{ row }">{{ fmt(row.original.fbw) }}</template>
        <template #fbs-cell="{ row }">{{ fmt(row.original.fbs) }}</template>
        <template #dbs-cell="{ row }">{{ fmt(row.original.dbs) }}</template>
        <template #cnc-cell="{ row }">{{ fmt(row.original.cnc) }}</template>
      </UTable>
    </UCard>

    <p class="text-sm text-gray-500 dark:text-gray-400 text-right">
      Найдено позиций:
      <span class="font-semibold text-gray-900 dark:text-gray-100">{{
        filteredRows.length
      }}</span>
      из {{ rows.length }}
    </p>
  </div>
</template>
