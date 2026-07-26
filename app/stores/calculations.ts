import { defineStore } from "pinia";

export interface SavedCalculation {
  id: string;
  createdAt: string;
  subject: string | null;
  scheme: "fbw" | "fbs" | "dbs";
  commissionPercent: number | null;
  costPrice: number;
  sellPrice: number;
  logistics: number;
  adsPercent: number;
  taxPercent: number;
  otherCosts: number;
  profit: number;
  marginPercent: number;
  roiPercent: number;
}

export const useCalculationsStore = defineStore("calculations", {
  state: () => ({
    items: [] as SavedCalculation[],
  }),
  actions: {
    add(calc: Omit<SavedCalculation, "id" | "createdAt">) {
      this.items.unshift({
        ...calc,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      });
    },
    remove(id: string) {
      this.items = this.items.filter((i) => i.id !== id);
    },
  },
  persist: true,
});
