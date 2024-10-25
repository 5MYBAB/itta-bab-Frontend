<script setup>

import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import router from "@/router/index.js";

const username = ref('');

onMounted(() => {
  const route = useRoute();
  username.value = route.query.username;
});

const goToLogin = () => {
  router.push('/login');
}
</script>

<template>
  <div class="container">
    <div class="logo">
      <img src="/src/assets/icons/logo.svg" alt="Logo"/>
    </div>
    <div class="result-container">
      <div id="description">
        <div id="content">{{ username }} 님 축하합니다!<br>
          회원가입이 완료되었습니다.
        </div>
      </div>
      <button @click="goToLogin">로그인 하러 가기</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  border-radius: 20px;
  width: 623px;
  height: 550px;
  background-color: var(--white);
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding-top: 40px;
}

.logo {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.result-container {
  display: flex;
  flex-direction: column; /* 수직 방향으로 정렬 */
  align-items: center; /* 입력 필드를 가로 가운데 정렬 */
}

.result-container button {
  margin-top: 16px;
  border-radius: 20px;
  background-color: var(--basic-yellow);
  width: 479px;
  height: 70px;
  border: none;
  font-size: 20px;
  font-weight: 600;;
}

.result-container #description {
  border: none;
  width: 479px;
  height: 300px;
  border-radius: 20px;
  background: #f2f1f1;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.result-container #content {
  color: var(--text-color);
  font-size: 24px;
  font-weight: 600;
  line-height: 1.4;
  text-align: center;
}

</style>