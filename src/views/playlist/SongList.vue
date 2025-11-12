<template>
  <div class="mt-2">
    <div class="flex text-xs text-gray-400 py-2">
      <div class="flex-auto">歌曲</div>
      <div class="w-1/4">歌手</div>
      <div class="w-1/4">专辑</div>
      <div class="w-20">时长</div>
    </div>
    <div class="text-sm">
      <template v-for="song in songs.slice(0, pageSize * page)" :key="song.id">
        <song-list-item :song="song" show-ar-name show-al-name />
      </template>
    </div>
    <div class="flex justify-center py-5" v-if="songs.length > pageSize && !noMore">
      <el-button type="text" class="text-center  w-full" @click="loadMore">加载更多</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import SongListItem from "@/components/common/SongListItem.vue";
import { computed, onMounted, ref } from "vue";
import { getPlayListTrackAll } from "@/utils/api";
import { Song } from "@/models/song";
import { usePlayerStore } from "@/stores/player";

const props = defineProps<{
  id: number,
}>()
const songs = ref<Song[]>([]);
const pageSize = ref(10)
const page = ref(1)
const { pushPlayList, play } = usePlayerStore()

const playAll = () => {
  pushPlayList(true, ...songs.value)
  play(songs.value.first().id)
}

const noMore = computed(() => {
  return page.value - (songs.value.length / pageSize.value) >= 0
})

const loadMore = () => {
  page.value = page.value + 1
}

const getData = () => {
  getPlayListTrackAll(props.id).then(res => {
    songs.value = res
  })
}
onMounted(() => { getData() })

//导出方法
defineExpose({
  playAll
})
</script>
<style lang="scss"></style>
