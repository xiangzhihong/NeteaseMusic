<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue';
import { formateSongsAuthor, useNumberFormat, getArrLast } from '@/utils/number';
import { useRoute, useRouter } from 'vue-router';
import { type VideoPlayerExpose } from '@/components/common/VideoPlayer.vue';
import CommentList from '@/components/mv/CommentList.vue';
import { userCheckLogin } from '../../hook/useCheckLogin';
import { getMvComment, getMvDetail, getMvUrl, getSimiMv, getSingerSong } from '@/utils/api';
import { Mv } from '@/models/simimv';
import { SongArtist } from '@/models/singersong';
import { MvDetailData } from '@/models/mvdetail';

const route = useRoute();
const router = useRouter();
const mvid = ref(route.params.id);

const loadingMaps = reactive({
  mvUrlLoading: true,
  myDetailLoading: true,
  simiMvLoading: true,
  reloadLoading: false,
  authorInfoLoading: true,
  commentLoading: true
});
const total = ref(100);
const pageSize = ref(20);
const pageNum = ref(1)
const mvUrl = ref('');
const simiMvList = ref<Mv[]>([]);
const mvDetail = ref<MvDetailData>();
const videoPlayRef = ref<VideoPlayerExpose>();
const authorInfo = ref<SongArtist>();
const mvComment = ref<any>({});
const commentContent = ref('');
const commentBtnLoading = ref(false);


const getMvVideoUrl = async (mvId: number = +mvid.value, setReloadLoading = false) => {
  const mv = await getMvUrl(mvId);
  mvUrl.value = mv.url;
  if (!loadingMaps.reloadLoading) {
    loadingMaps.mvUrlLoading = false;
  }
  if (setReloadLoading) {
    loadingMaps.reloadLoading = false;
  }
};
const getSimiMvList = async (mvId: number = +mvid.value) => {
  const simimv = await getSimiMv(mvId);
  console.log(simimv)
  simiMvList.value = simimv.mvs;
  !loadingMaps.reloadLoading && (loadingMaps.simiMvLoading = false);
};

const getMvDetailInfo = async (mvId: number = +mvid.value) => {
  const detailInfo = await getMvDetail(mvId);
  mvDetail.value = detailInfo.data
  getSingerSongInfo(detailInfo.data.artistId)
};


const getSingerSongInfo = async (id: number) => {
  const singleSong = await getSingerSong(id);
  authorInfo.value = singleSong.artist;
  console.log(authorInfo)
  !loadingMaps.reloadLoading && (loadingMaps.authorInfoLoading = false);
};

const getMvCommentInfo = async (mvId: number = +mvid.value) => {
  const comment = await getMvComment(mvId, pageNum.value);
  mvComment.value = comment;
  total.value = mvComment.value.total
  !loadingMaps.reloadLoading && (loadingMaps.commentLoading = false);
};


const handleImgClick = async (id: number) => {
  videoPlayRef.value?.stop();
  // router.push(`/mv/${id}`);
  mvid.value=  JSON.stringify(id)
  getMvDetailInfo();
  getSimiMvList();
  getMvVideoUrl();
  getMvCommentInfo();
  //  router.push({name:Pages.mvDetail,query:{id: id}})
};


const updateCommentList = (value: any) => {
  mvComment.value.total += 1;
  mvComment.value.comments.unshift(value);
};

const updateCommentLiked = (data: { liked: boolean, index: number }, isHot: boolean) => {
  let { index, liked } = data;
  if (isHot) {
    mvComment.value.hotComments[index].liked = liked;
    liked
      ? mvComment.value.hotComments[index].likedCount += 1
      : mvComment.value.hotComments[index].likedCount -= 1;
  } else {
    mvComment.value.comments[index].liked = liked;
    liked
      ? mvComment.value.comments[index].likedCount += 1
      : mvComment.value.comments[index].likedCount -= 1;
  }
};

const currentChange = (newPage) => {
  pageNum.value = newPage
  getMvCommentInfo()
}

const handleCommentClick = () => {
  if (!commentContent.value) {
    return window.$message.error('评论不能为空!');
  }
  return userCheckLogin(() => {
    let params = {
      t: 1,
      content: commentContent.value,
      id: +mvid.value,
      type: 1
    };
    window.$message.success('评论成功');

  });
}

onMounted(() => {
  getMvDetailInfo();
  getSimiMvList();
  getMvVideoUrl();
  getMvCommentInfo();
})
</script>

<template>
  <div class="py-10">
    <div class="flex justify-between">
      <div class="flex-1">
        <div class="flex items-center mb-5 cursor-pointer">
          <p class="ml-2 title">
            MV详情
          </p>
        </div>
        <!-- 播放器 -->
        <div id="mv-player">
          <!-- <div v-show="loadingMaps.mvUrlLoading">
            <n-skeleton height="640px" width="100%" />
          </div> -->
          <n-spin :show="loadingMaps.reloadLoading">
            <video class="aspect-video w-full" :src="mvUrl" autoplay controls />
          </n-spin>

          <div v-if="!loadingMaps.authorInfoLoading">
            <!-- 歌手信息 -->
            <div class="flex items-center mt-5">
              <n-avatar :img-props="{ crossorigin: 'anonymous' }" round :size="75" :src="authorInfo.picUrl" />
              <div class="ml-4">
                <p class=" text-lg">
                  {{ authorInfo.name }}
                </p>
                <n-ellipsis class="max-w-2xl text-xs opacity-60" :line-clamp="2">
                  {{ authorInfo.briefDesc }}
                </n-ellipsis>
              </div>
            </div>
            <!-- mv详情 -->
            <div class="mt-8">
              <p class="text-xl font-bold">
                {{ mvDetail.name }}
              </p>
              <div class="mt-6 text-xs opacity-60">
                <span>
                  发布：{{ mvDetail.publishTime }}
                </span>
                <span class="ml-6">
                  播放：{{ useNumberFormat(mvDetail.playCount) }}
                </span>
              </div>
            </div>
          </div>
          <div v-else>
            <!-- 歌手信息 -->
            <div class="flex items-center mt-5">
              <n-skeleton width="70px" height="75px" circle />
              <div class="flex flex-col ml-4">
                <n-skeleton text width="80px" />
                <n-skeleton text width="600px" class="mt-2" />
              </div>
            </div>
            <!-- mv详情 -->
            <div class="mt-8">
              <n-skeleton width="450px" text />
              <div class="flex mt-6 text-xs opacity-60">
                <n-skeleton width="100px" text />
                <n-skeleton width="100px" class="ml-6" text />
              </div>
            </div>
          </div>

          <div v-show="loadingMaps.commentLoading">
            <div v-for="item in 15" :key="item" class="flex mt-5">
              <n-skeleton circle width="50px" height="50px" />
              <div class="flex-1 pb-5 ml-4">
                <n-skeleton text />
                <n-skeleton text />
                <div class="flex justify-between mt-2 text-xs opacity-60">
                  <n-skeleton width="100px" />
                  <n-skeleton width="100px" />
                </div>
              </div>
            </div>
          </div>

          <div v-show="!loadingMaps.commentLoading">
            <!-- 评论 -->
            <p class="mt-14 text-2xl font-bold">
              评论
              <span class="text-sm opacity-60">({{ mvComment.total }})</span>
            </p>
            <n-input v-model:value="commentContent" maxlength="140" :show-count="true" class="mt-5 h-32"
              type="textarea" />
            <div class="flex justify-end mt-4">
              <n-button :loading="commentBtnLoading" type="primary" @click="handleCommentClick">
                评论
              </n-button>
            </div>
            <!-- 精彩评论 -->
            <comment-list :resource-id="+mvid" title="精彩评论" :list="mvComment.hotComments || []"
              @update-comment-list="updateCommentList"
              @update-comment-liked="(data: any) => updateCommentLiked(data, true)" />
            <!-- 最新评论 -->
            <comment-list :resource-id="+mvid" :comment-total-num="mvComment.total" title="最新评论"
              :list="mvComment.comments || []" @update-comment-list="updateCommentList"
              @update-comment-liked="(data: any) => updateCommentLiked(data, false)" />
          </div>

          <!-- 分页 -->
          <div v-if="total > 1" class="flex justify-end mt-6">
            <el-pagination background layout="prev, pager, next" :current-page="pageNum" :page-size="pageSize"
              :total="total" @current-change="currentChange" />
          </div>
        </div>
      </div>

      <div class="ml-10">
        <p class="mb-4  title">
          相关推荐
        </p>
        <div v-if="simiMvList.length">
          <div v-for="item in simiMvList" :key="item.id" class="flex mt-4" @click="handleImgClick(item.id)">
            <el-image class="rounded-lg" style="width: 180px; height: 90px" :src="item.cover" />
            <div class="flex flex-col justify-center ml-4 w-48">
              <n-ellipsis>{{ item.name }}</n-ellipsis>
              <n-ellipsis class="text-xs opacity-60">
                buy {{ formateSongsAuthor(item.artists) }}
              </n-ellipsis>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  @apply text-lg font-bold;
}
</style>
