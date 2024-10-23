<script setup>
import { ref } from 'vue';
import '@/assets/css/resetcss.css';

const password = ref('');
const confirmPassword = ref('');

const errorMessage = ref('');

const checkPasswords = () => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = '비밀번호가 일치하지 않습니다.';
  } else {
    errorMessage.value = '';
    alert('회원 정보가 수정되었습니다.');
  }
};
</script>

<template>
  <div class="back">
    <img src="@/assets/icons/logo.svg">
    <div class="white-box">
      <div class="title">회원 정보 수정</div>
      <div class="form">
        <div class="inline">
          <div class="label">비밀번호</div>
          <div>
            <input type="password" v-model="password">
            <div class="notice">영문, 숫자 포함하여 8~15자 입력해주세요</div>
          </div>
        </div>
        <div class="inline">
          <div class="label">비밀번호 재확인</div>
          <div><input type="password" v-model="confirmPassword"></div>
        </div>
      </div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <input type="button" value="수정하기" @click="checkPasswords">
    </div>
  </div>
</template>

<style scoped>
.label{
  font-size: 17px;
  font-weight: 600;
  margin-right: 70px;
}
input[type="password"]{
  width: 328px;
  height: 44px;
  border-radius: 10px;
  border:none;
  background-color: var(--gray-input);
}
.notice{
  font-size: 14px;
  color: var(--gray-font);
}
input[type="button"]{
  margin-top: 30px;
  border-radius: 52px;
  background-color: var(--basic-yellow);
  border:none;
  font-weight: 600;
  font-size: 18px;
  width: 30%;
  height: 44px;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.50));
}
.inline{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0px;
}
.title{
  font-weight: 600;
  font-size: 25px;
  padding-bottom: 80px;
}
.white-box{
  background-color: var(--white);
  box-shadow: 0px 4px 13px 0px rgba(0, 0, 0, 0.13) inset;
  border-radius: 43px;
  height: 500px;
  width: 60%;
  margin-top: 50px;
  display: flex;
  padding-top: 60px;
  align-items: center;
  flex-direction: column;
}
.back img{
  width: 66px;
}
.back{
  background-color: var(--background-color);
  display: flex;
  justify-content: center;
  padding-top: 100px;
  flex-direction: column;
  align-items: center;
}
.error-message {
  color: var(--real-red);
  font-size: 16px;
  margin-top: 10px;
}
</style>
