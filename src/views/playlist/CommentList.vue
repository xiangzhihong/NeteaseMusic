<template>
  <div>
    <n-input v-model:value="commentValue" type="textarea" :maxlength="140" :show-count="true" />
    <div class="flex justify-end mt-5">
      <n-button round :loading="commentBtnLoading" @click="submitComment">
        评论
      </n-button>
    </div>
    <!-- 精彩评论 -->
    <div>
      <comment-list :type="2" :resource-id="+songListId" title="精彩评论" :list="songListComment.hotComments || []"
        @update-comment-list="updateCommentList"
        @update-comment-liked="(data: any) => updateCommentLiked(data, true)" />
      <comment-list :resource-id="+songListId" :type="2" :comment-total-num="songListComment.total" title="最新评论"
        :list="songListComment.comments || []" @update-comment-list="updateCommentList"
        @update-comment-liked="(data: any) => updateCommentLiked(data, false)" />
    </div>
    <p v-if="!songListComment.comments?.length" class="text-center opacity-50">
      还没有评论, 快来抢沙发~
    </p>
    <div v-if="total > 1" class="flex justify-end mt-6">
      <el-pagination background layout="prev, pager, next" :current-page="pageNum" :page-size="pageSize" :total="total"
        @current-change="currentChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CommentList from '@/components/mv/CommentList.vue';
import { getPlayListComment } from '@/utils/api';
import { onMounted, ref } from 'vue';

const props = defineProps<{
  id: number,
}>()

const songListId = ref(props.id);
const songListComment = ref<any>({});
const commentBtnLoading = ref(false);
const commentValue = ref('');
const total = ref(0);
const pageSize = ref(20);
const pageNum = ref(1)

const updateCommentList = (value: any) => {
  songListComment.value.total += 1;
  songListComment.value.comments.unshift(value);
};

const updateCommentLiked = (data: { liked: boolean, index: number }, isHot: boolean) => {
  let { index, liked } = data;
  if (isHot) {
    songListComment.value.hotComments[index].liked = liked;
    liked
      ? songListComment.value.hotComments[index].likedCount += 1
      : songListComment.value.hotComments[index].likedCount -= 1;
  } else {
    songListComment.value.comments[index].liked = liked;
    liked
      ? songListComment.value.comments[index].likedCount += 1
      : songListComment.value.comments[index].likedCount -= 1;
  }
};

const currentChange = (newPage) => {
  pageNum.value = newPage
  getData()                // 重新加载数据
}

//点击评论
const submitComment = () => {
  if (!commentValue.value) {
    return window.$message.error('评论不能为空!');
  } else {
    window.$message.success('评论成功');
  }
};

async function getData() {
  getPlayListComment(props.id, pageNum.value).then(res => {
    songListComment.value = res;
    total.value = songListComment.value.total
  })
}

onMounted(() => {
  getData()
})
</script>
<style lang="scss"></style>
