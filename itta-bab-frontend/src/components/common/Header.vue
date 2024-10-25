<script setup>
import '@/assets/css/resetcss.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {useAuthStore} from "@/stores/auth.js";
import {useRouter} from 'vue-router';
import Notification from "@/components/common/Notification.vue";
import {onMounted, ref} from "vue";

const authStore = useAuthStore();
const router = useRouter();
const isLogin = ref(null);

onMounted(() => {
  const token = authStore.accessToken;
  isLogin.value = !!token;
});

const handleLogout = () => {
  authStore.logout();
  alert('로그아웃 되었습니다.');
  // window.location.reload();
}

const goToMainPage = () => {
  router.push('/');
}

const goToStoreListPage = () => {
  router.push("/store");
}

const goToGroupPage = () => {
  router.push('/group');
}

const goToBoardPage = () => {
  router.push('/board/post');
}

const goToMypage = () => {
  router.push('/mypage');
}

</script>
<template>
  <header>
    <div class="headerWrap">
      <div id="logo" v-on:click="goToMainPage" class="custom-cursor">itta-bab</div>
      <ul class="header-list">
        <li v-on:click="goToStoreListPage" class="custom-cursor">맛집 리스트</li>
        <li v-on:click="goToGroupPage" class="custom-cursor">모임 참여</li>
        <li v-on:click="goToBoardPage" class="custom-cursor">익명 커뮤니티</li>
      </ul>
      <div class="user-tap">
        <Notification/>
        <div @click="goToMypage" id="mypage" class="custom-cursor"><font-awesome-icon :icon="['far', 'user']" /></div>
        <div @click="handleLogout" id="log-out" :class="{ disabled: !isLogin, 'custom-cursor': isLogin }"
             :style="{ opacity: isLogin ? 1 : 0 }"><font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" /></div>
      </div>
    </div>
  </header>
</template>
<style scoped>

* {
  color: var(--text-color);
}

.headerWrap {
  display: flex;
  height: 100px;
  align-items: center;
  justify-content: space-between;
  background-color: var(--white);
}

#logo {
  font-size: 35px;
  margin-left: 50px;
  font-weight: 600;
}

.header-list {
  font-size: 20px;
}

li {
  display: inline;
  margin: 25px;
}

.user-tap {
  display: flex;
  height: 100px;
  align-items: center; /* 세로 가운데 정렬 */
}

.user-tap div {
  font-size: 20px;
  margin: 10px;
}

#log-out {
  margin-right: 50px;
}
.custom-cursor{
  cursor: pointer;
}
.disabled {
  pointer-events: none; /* 클릭 비활성화 */
  opacity: 0.5; /* 투명도 설정 */
}
</style>