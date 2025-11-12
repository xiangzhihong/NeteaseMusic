import { defineStore } from "pinia";
import { ref } from "vue";
import { getBanner } from "@/utils/api";
import type { Banner } from "@/models/banner";

export const useCommonStore = defineStore("common", () => {
  const banners = ref<Banner[]>([]);

  const getBanners = async () => {
    if (banners.value.length) return;
    banners.value = await getBanner();
  };

  return {
    banners,
    getBanners,
  };
});
