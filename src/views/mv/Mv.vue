<script setup lang="ts">
import CategoryTab from '@/components/common/CategoryTab.vue';
import MvList from '@/components/mv/MvList.vue';
import { getMvList } from '@/utils/api';
import { NSpace } from 'naive-ui';
import {onMounted,reactive, ref, watch} from 'vue';
const areaList = [ '全部', '内地', '港台', '欧美', '日本', '韩国'];
const typeList = ['全部', '官方版', '现场版', '原生', '网易出品'];
const orderList = ['最热', '最新', '上升最快'];

const params = reactive({
  area: areaList[0],
  type: typeList[0],
  order: orderList[0]
});

const list = ref<any>([]);
const listIsLoading = ref(true)
const total = ref(100);
const pageSize = ref(20);
const pageNum = ref(1)

onMounted(() => {
  fetchMvList()
})

async function fetchMvList() {
  await getMvList(params.area, params.order, params.type, pageNum.value).then((res) => {
    console.log(res)
    list.value = res.data
    total.value = 500
    listIsLoading.value = false
  })
}

const currentChange = (newPage) => {
  pageNum.value = newPage
  fetchMvList()
}

watch(params, () => {
  fetchMvList();
});
</script>

<template>
  <div class="overflow-hidden p-6 musicList">
    <n-space vertical class="sticky top-0 z-40 py-4" :size="20">
      <category-tab v-model="params.area" name="地区" :list="areaList" />
      <category-tab v-model="params.type" name="类型" :list="typeList" />
      <category-tab v-model="params.order" name="排序" :list="orderList" />
    </n-space>
    <div class="py-4">
      <mv-list v-if="!listIsLoading" :list="list" />
      <div class="flex justify-end mt-4">
        <el-pagination background layout="prev, pager, next" :current-page="pageNum" :page-size="pageSize" :total="total"
          @current-change="currentChange" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.n-layout .n-layout-scroll-container::-webkit-scrollbar-thumb {
  background-color: transparent;
}

:deep(.n-layout .n-layout-scroll-container) {
  overflow: hidden;
}
</style>