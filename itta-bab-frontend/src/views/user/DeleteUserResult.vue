<script setup>
import '@/assets/css/resetcss.css';
import router from "@/router/index.js";
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";

const username = ref('');

const goToLogin = () => {
  router.push('/user/login');
};
const goToSignUp = () => {
  router.push('/user/signup')
}

onMounted(() => {
  const route = useRoute();
  username.value = route.query.username;
  console.log(route.query.username)
});

</script>

<template>
  <div class="back">
    <img src="@/assets/icons/logo.svg">
    <div class="white-box">
      <div class="title">itta-bab</div>
      <div class="form">
        <div><span>{{ username }}</span>님<br>회원탈퇴가 완료 되었습니다.</div>
      </div>
      <input type="button" value="로그인 하러 가기" @click="goToLogin">
      <div class="signup" @click="goToSignUp">회원가입</div>
    </div>
  </div>
</template>

<style scoped>
.signup{
  color: var(--gray-font);
  font-size: 20px;
  font-weight: 600;
  margin-top: 20px;
}
.form{
  font-size: 24px;
  font-weight: 600;
  color: var(--gray-font);
  text-align: center;
  background-color: var(--gray-input);
  border-radius: 20px;
  width: 60%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.form span{
  color: var(--text-color);
  background-color: var(--background-color);
}
input[type="button"] {
  margin-top: 30px;
  border-radius: 50px;
  background-color: var(--basic-yellow);
  border: none;
  font-weight: 600;
  font-size: 18px;
  width: 60%;
  height: 44px;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.50));
}
.title {
  font-weight: 600;
  font-size: 25px;
  padding-bottom: 60px;
}
.white-box {
  background-color: var(--white);
  box-shadow: 0px 4px 13px 0px rgba(0, 0, 0, 0.13) inset;
  border-radius: 43px;
  height: 700px;
  width: 50%;
  margin-top: 50px;
  display: flex;
  padding-top: 60px;
  align-items: center;
  flex-direction: column;
}
.back img {
  width: 66px;
}
.back {
  background-color: var(--background-color);
  display: flex;
  justify-content: center;
  padding-top: 100px;
  flex-direction: column;
  align-items: center;
}
</style>
