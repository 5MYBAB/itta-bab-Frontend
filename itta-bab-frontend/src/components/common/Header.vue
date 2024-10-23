<script setup>
import '@/assets/css/resetcss.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {useAuthStore} from "@/stores/auth.js";
import {useRouter} from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  alert('로그아웃 되었습니다.');
  window.location.reload();
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

</script>
<template>
  <header>
    <div class="headerWrap">
      <div id="logo" v-on:click="goToMainPage">itta-bab</div>
      <ul class="header-list">
        <li v-on:click="goToStoreListPage">맛집 리스트</li>
        <li v-on:click="goToGroupPage">모임 참여</li>
        <li v-on:click="goToBoardPage">익명 커뮤니티</li>
      </ul>
      <div class="user-tap">
        <div id="alarm"><font-awesome-icon :icon="['fas', 'bell']" /></div>
        <div id="mypage"><font-awesome-icon :icon="['far', 'user']" /></div>
        <div @click="handleLogout" id="log-out" class="custom-cursor"><font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" /></div>
      </div>
    </div>
  </header>
</template>
<style scoped>
@import '../../assets/css/resetcss.css';

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
</style>