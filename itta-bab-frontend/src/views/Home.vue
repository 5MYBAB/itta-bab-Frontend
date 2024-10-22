<script setup>
import {useRoute, useRouter} from "vue-router";

const currentRoute = useRoute();

const router = useRouter();

function goToLogin() {
  router.push('/user/login')
}

function goToSignUp() {
  router.push('/user/signup')
}
</script>

<template>
  <div>
    <h1>Home 화면 입니다.</h1>
    <button @click="goToLogin">로그인</button>
    <button @click="goToSignUp">회원가입</button>
  </div>
</template>

<style scoped>
div{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
h1{
  font-size: 50px;
  margin: 20px;
}
button {
  font-size: 40px;
}
</style>