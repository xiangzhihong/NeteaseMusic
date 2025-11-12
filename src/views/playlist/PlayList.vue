<template>
  <div class="playlist">
    <div class="p-5" >
      <Info :id="id" :play-all="() => playAllSong()" />
      <el-tabs class="mt-3" v-model="tab">
        <el-tab-pane lazy label="歌曲" name="tracks">
          <SongList :id="id" ref="songlistRef"/>
        </el-tab-pane>
        <el-tab-pane lazy label="评论" name="comments">
          <CommentList :id="id" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref } from "vue";
import Info from "@/views/playlist/Info.vue";
import SongList from "@/views/playlist/SongList.vue";
import CommentList from "./CommentList.vue";
const songlistRef = ref<HTMLElement>();

const route = useRoute();
const id: number = Number(route.query.id);
const tab = ref('tracks')

const playAllSong = () => {
   songlistRef.value.playAll();
}
</script>

<style lang="scss">
.playlist {
  .el-tabs__nav-wrap::after {
    height: 0;
  }

  .el-tabs__header {
    @apply m-0;
  }
}
</style>
