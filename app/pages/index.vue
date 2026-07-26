<!-- app/pages/index.vue -->
<script setup lang="ts">
import commissionsData from "~/assets/data/wb-commissions.json";
import { useCalculationsStore } from "~/stores/calculations";

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
const store = useCalculationsStore();
const route = useRoute();
const toast = useToast();

const rawData = commissionsData as any;
const rows = (
  Array.isArray(rawData) ? rawData : (rawData.rows ?? rawData.data ?? [])
) as CommissionRow[];

const subjectItems = computed(() =>
  rows.map((r) => {
    const hasSubject = r.subject?.trim();
    return {
      label: hasSubject
        ? `${r.subject} (${r.parentCategory})`
        : r.parentCategory,
      value: hasSubject ? r.subject : r.parentCategory,
    };
  }),
);

const selectedSubject = ref<string>("");
const selectedRow = computed(() => {
  if (!selectedSubject.value) return null;
  return (
    rows.find((r) => r.subject === selectedSubject.value) ??
    rows.find((r) => r.parentCategory === selectedSubject.value) ??
    null
  );
});

const scheme = ref<"fbw" | "fbs" | "dbs">("fbw");
const schemeItems = [
  { label: "Склад WB (FBW)", value: "fbw" },
  { label: "Маркетплейс / со своего склада (FBS)", value: "fbs" },
  { label: "Витрина / Курьер WB / ПВЗ (DBS)", value: "dbs" },
];

const commissionPercent = computed(() =>
  selectedRow.value ? selectedRow.value[scheme.value] : null,
);

const costPrice = ref<number>(0);
const sellPrice = ref<number>(0);
const logistics = ref<number>(0);
const adsPercent = ref<number>(0);
const taxPercent = ref<number>(6);
const otherCosts = ref<number>(0);

const commissionAmount = computed(() =>
  commissionPercent.value != null
    ? sellPrice.value * (commissionPercent.value / 100)
    : 0,
);
const adsAmount = computed(() => sellPrice.value * (adsPercent.value / 100));
const taxAmount = computed(() => sellPrice.value * (taxPercent.value / 100));

const totalCosts = computed(
  () =>
    costPrice.value +
    commissionAmount.value +
    logistics.value +
    adsAmount.value +
    taxAmount.value +
    otherCosts.value,
);

const profit = computed(() => sellPrice.value - totalCosts.value);
const marginPercent = computed(() =>
  sellPrice.value > 0 ? (profit.value / sellPrice.value) * 100 : 0,
);
const roiPercent = computed(() =>
  costPrice.value > 0 ? (profit.value / costPrice.value) * 100 : 0,
);

function saveCalculation() {
  store.add({
    subject: selectedSubject.value,
    scheme: scheme.value,
    commissionPercent: commissionPercent.value,
    costPrice: costPrice.value,
    sellPrice: sellPrice.value,
    logistics: logistics.value,
    adsPercent: adsPercent.value,
    taxPercent: taxPercent.value,
    otherCosts: otherCosts.value,
    profit: profit.value,
    marginPercent: marginPercent.value,
    roiPercent: roiPercent.value,
  });
  toast.add({
    title: "Расчёт сохранён",
    description: "Смотрите в разделе «История»",
    color: "success",
  });
}

// Загрузка расчёта из истории по query-параметру ?load=<id>
onMounted(() => {
  const loadId = route.query.load as string | undefined;
  if (!loadId) return;
  const found = store.items.find((i: any) => i.id === loadId);
  if (!found) return;

  selectedSubject.value = found.subject || "";
  scheme.value = found.scheme || "fbw";
  costPrice.value = found.costPrice || 0;
  sellPrice.value = found.sellPrice || 0;
  logistics.value = found.logistics || 0;
  adsPercent.value = found.adsPercent || 0;
  taxPercent.value = found.taxPercent || 6;
  otherCosts.value = found.otherCosts || 0;

  toast.add({ title: "Расчёт загружен из истории", color: "success" });
});

useSeoMeta({
  title:
    "Калькулятор юнит-экономики для селлеров Wildberries — расчёт прибыли онлайн",
  description:
    "Бесплатный калькулятор юнит-экономики для продавцов Wildberries: прибыль, комиссия, логистика, налоги и рентабельность товара за 2 минуты.",
});
</script>

<template>
  <div class="max-w-6xl mx-auto p-6">
    <header class="space-y-2 mb-8">
      <h1 class="text-3xl font-bold">
        Калькулятор юнит-экономики для Wildberries
      </h1>
      <p class="text-gray-500">
        Посчитайте реальную прибыль с продажи товара на WB с учётом комиссии,
        логистики, рекламы и налогов.
      </p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <!-- Левая колонка: форма -->
      <div class="space-y-6">
        <UCard>
          <template #header
            ><h2 class="text-lg font-semibold">
              Товар и схема продажи
            </h2></template
          >
          <div class="space-y-4">
            <UFormField label="Категория / предмет">
              <USelectMenu
                v-model="selectedSubject"
                :items="subjectItems"
                value-attribute="value"
                option-attribute="label"
                searchable
                placeholder="Начните вводить название предмета"
                class="w-full"
              />
            </UFormField>

            <UFormField label="Схема работы">
              <USelect v-model="scheme" :items="schemeItems" />
            </UFormField>

            <p v-if="commissionPercent != null" class="text-sm text-gray-500">
              Комиссия WB по выбранной схеме: <b>{{ commissionPercent }}%</b>
            </p>
          </div>
        </UCard>

        <UCard>
          <template #header
            ><h2 class="text-lg font-semibold">Цены и расходы</h2></template
          >
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <UFormField label="Себестоимость, ₽">
              <UInput v-model.number="costPrice" type="number" min="0" />
            </UFormField>
            <UFormField label="Цена продажи, ₽">
              <UInput v-model.number="sellPrice" type="number" min="0" />
            </UFormField>
            <UFormField label="Логистика WB, ₽ за единицу">
              <UInput v-model.number="logistics" type="number" min="0" />
            </UFormField>
            <UFormField label="Прочие расходы, ₽">
              <UInput v-model.number="otherCosts" type="number" min="0" />
            </UFormField>
            <UFormField label="Реклама, % от выручки">
              <UInput
                v-model.number="adsPercent"
                type="number"
                min="0"
                max="100"
              />
            </UFormField>
            <UFormField label="Налог, %">
              <UInput
                v-model.number="taxPercent"
                type="number"
                min="0"
                max="100"
              />
            </UFormField>
          </div>
        </UCard>
      </div>

      <!-- Правая колонка: результат, прилипающий при скролле -->
      <div class="lg:sticky lg:top-6">
        <UCard>
          <template #header
            ><h2 class="text-lg font-semibold">Результат</h2></template
          >
          <dl class="grid grid-cols-2 gap-y-3 text-sm">
            <dt class="text-gray-500">Комиссия WB</dt>
            <dd class="text-right">{{ commissionAmount.toFixed(2) }} ₽</dd>
            <dt class="text-gray-500">Налог</dt>
            <dd class="text-right">{{ taxAmount.toFixed(2) }} ₽</dd>
            <dt class="text-gray-500">Реклама</dt>
            <dd class="text-right">{{ adsAmount.toFixed(2) }} ₽</dd>
            <dt class="text-gray-500">Итого расходы</dt>
            <dd class="text-right">{{ totalCosts.toFixed(2) }} ₽</dd>
            <dt class="font-semibold">Прибыль с единицы</dt>
            <dd
              class="text-right font-semibold"
              :class="profit >= 0 ? 'text-green-600' : 'text-red-600'"
            >
              {{ profit.toFixed(2) }} ₽
            </dd>
            <dt class="font-semibold">Маржинальность</dt>
            <dd class="text-right font-semibold">
              {{ marginPercent.toFixed(1) }}%
            </dd>
            <dt class="font-semibold">ROI</dt>
            <dd class="text-right font-semibold">
              {{ roiPercent.toFixed(1) }}%
            </dd>
          </dl>

          <UButton
            class="w-full justify-center mt-6"
            color="primary"
            @click="saveCalculation"
          >
            Сохранить расчёт
          </UButton>
        </UCard>
      </div>
    </div>
  </div>
</template>
