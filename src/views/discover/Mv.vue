<template>
  <Title title="推荐MV" class="mt-5"/>
  <div class="grid grid-flow-row grid-cols-2 lg:grid-cols-4 gap-5">
    <div v-for="item in personalizedMv" :key="item.id" @click="toDetail(item.id)">
      <CoverPlay :pic-url="item.cover" video :name="item.name" :play-count="item.playCount" show-play-count/>
      <div class="truncate text-sm mt-2">{{ item.name }}</div>
      <div class="truncate text-sm mt-1.5 text-slate-400"><small>{{ item.artistName }}</small></div>
      <div style="height: 15px;"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, toRefs} from "vue";
import {useVideoStore} from "@/stores/video";
import CoverPlay from "@/components/common/CoverPlay.vue";
import {useRouter} from "vue-router";

const {personalizedMv} = toRefs(useVideoStore())
const {getPersonalizedMv} = useVideoStore()

const router = useRouter()

const toDetail = (id: number) => {
    router.push(`/mv/${id}`);
    //  router.push({name:Pages.mvDetail,query:{id: id}})
};

onMounted(async () => {
  await getPersonalizedMv()
})
</script>

<style lang="scss">

</style>
