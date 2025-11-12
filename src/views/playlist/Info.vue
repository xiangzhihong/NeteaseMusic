<template>
  <div class="flex items-stretch" v-if="playlist">
    <img :src="playlist.coverImgUrl" alt="" class="w-44 h-44 object-cover rounded-xl flex-shrink-0">
    <div class="pl-5 flex flex-col justify-between py-1 flex-1">
      <div>
        <div class="text-2xl font-bold">{{ playlist.name }}</div>
        <div class="flex items-center text-xs text-dc pb-2 pt-3">
          <el-avatar :src="playlist.creator.avatarUrl" size="small" round />
          <span class="ml-2">{{ playlist.creator.nickname }}</span>
          <div class="ml-5 flex text-dc">
            <div class="ml-2 hover-text" v-for="tag in playlist.tags" :key="tag">#{{ tag }}</div>
          </div>
        </div>
        <div class="text-sm text-gray-500 leading-normal">
          <MoreText :text="playlist.description" :end="90" />
        </div>
      </div>
      <div class="justify-self-stretch mt-5 gap-x-2 flex items-center">
        <button class="w-32 button" @click="playAll">
          <IconPark :icon="PlayOne" size="22" class="mr-1" />
          <span>播放全部</span>
        </button>
        <button class="w-32 button-outline">
          <IconPark :icon="Like" size="18" class="mr-1" />
          <span>收藏</span>
        </button>

        <el-dropdown placement="bottom">
          <button class="el-dropdown-btn">
            <div class="button-outline w-8">
              <IconPark :icon="More" />
            </div>
          </button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="(item, key) in moreList" :key="key">
                {{ item.title }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlayOne, Like, More } from '@icon-park/vue-next'

import MoreText from "@/components/common/MoreText.vue";
import IconPark from "@/components/common/IconPark.vue";
import type { PlayListDetail } from "@/models/playlist";
import { getPlayListDetail } from '@/utils/api';
import { onMounted, ref } from 'vue';

const props = defineProps<{
  id: number,
  playAll?: () => void,
}>()

const playlist = ref<PlayListDetail>();
const moreList = [
  { value: "0", title: "添加到" },
  { value: "1", title: "分享" },
  { value: "2", title: "下载" },
  { value: "3", title: "举报" },
]

const getData = () => {
  getPlayListDetail(props.id).then(res => {
    playlist.value = res
  })
}
onMounted(() => { getData() })
</script>

<style scoped>
:deep(.el-dropdown-btn) {
  &:hover,
  &:active,
  &:focus {
    background-color: transparent !important;
    color: inherit !important;
    text-decoration: none !important;
    outline: none !important;
  }
}
.selected {
  color: green;
}
</style>