import { useUserStore } from '@/stores/user';

export function userCheckLogin(callback:() => void, message='请先登录') {
  const mainStore = useUserStore();
  if (!mainStore.isLogin) {
    window.$message.error(message);
  } else {
    callback();
  }
}