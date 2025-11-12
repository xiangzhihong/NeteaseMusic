<script setup lang="ts">
import { Pages } from '@/router/pages';
import { useRouter } from 'vue-router';
const props = withDefaults(defineProps<{
  item: any;
  height?: string;
  isToDetail?: boolean;
  borderRadius?: string;
  className?: string;
}>(), {
  height: '9vw',
  isToDetail: true,
  borderRadius: '10px',
  className: ''
});
const emit = defineEmits(['handle-img-click']);
const router = useRouter();

const toDetail = (id: number) => {
  if (props.isToDetail) {
    router.push(`/mv/${id}`);
    //  router.push({name:Pages.mvDetail,query:{id: id}})
  }
  // emit('handle-img-click', id);
};
const styleBorderRadius = { borderRadius: props.borderRadius };
</script>

<template>
  <div :style="styleBorderRadius" class="overflow-hidden relative flex-1" @click="toDetail(item.id)">
    <CoverPlay :pic-url="item.picUrl || item.cover" video :name="item.name" :play-count="item.playCount"
      show-play-count />
    <div :style="styleBorderRadius" class="absolute left-3 bottom-2 w-full text-left bg-linear-mask">
      <n-time class="mr-2 text-white" :time="item.duration" format="mm:ss" />
    </div>
  </div>
</template>

<style scoped>
.tips {
  /* overflow-hidden absolute top-0 w-full h-0 group-hover:h-8 leading-8 text-center text-white bg-black/50 transition-height */
}
</style>