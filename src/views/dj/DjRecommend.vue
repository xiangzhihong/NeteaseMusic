<template>
  <Title title="个性推荐" class="mt-5" />
  <div class="grid grid-flow-row grid-cols-3 lg:grid-cols-8 gap-5">
    <div v-for="item in djPersonalize" :key="item.id" @click="router.push({ name: 'video', query: { id: item.id } })">
      <CoverPlay :pic-url="item.picUrl" :name="item.name" :play-count="0" />
      <div class="truncate text-xs mt-2">{{ item.name }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import CoverPlay from "@/components/common/CoverPlay.vue";
import { useRouter } from "vue-router";
import { getDjPersonalize } from "@/utils/api";
import { DjPersonalizeData } from "@/models/dj_personalize";

const router = useRouter()
const djPersonalize = ref<DjPersonalizeData[]>([])

const getData = async () => {
 await getDjPersonalize().then(res => {
    djPersonalize.value = res
  })
}

onMounted(() => {
  getData()
})
</script>
<style lang="scss"></style>
