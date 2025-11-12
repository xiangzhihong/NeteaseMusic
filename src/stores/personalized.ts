import { defineStore } from "pinia";
import { ref } from "vue";
import { getDjPersonalize, usePersonalizedDjProgram } from "@/utils/api";
import type { DjProgram } from "@/models/personalized";
import { DjPersonalize } from "@/models/dj_personalize";
import { Json } from "@vicons/carbon";

export const usePersonalizedStore = defineStore(
    'personalized',
    () => {
        const djProgram = ref<DjProgram[]>([])
        const getDjProgram = async () => {
            if (djProgram.value.length) return;
            djProgram.value = await usePersonalizedDjProgram()
        }

        const djPersonalize = ref<DjPersonalize[]>([])
        const getDjPersonalized = async () => {
            if (djPersonalize.value.length) return;
            let result: DjPersonalize = await getDjPersonalize()
            djPersonalize.value = JSON.parse(JSON.stringify(result.data));
        }

        return {
            djProgram,getDjProgram,
            djPersonalize,getDjPersonalized
        }

    });
