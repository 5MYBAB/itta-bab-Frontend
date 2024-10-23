<script setup>
import { ref } from 'vue';
import '@/assets/css/resetcss.css';

const userInput = ref('');
const errorMessage = ref('');

const checkInput = () => {
  if (userInput.value !== '회원 탈퇴 하겠습니다.') {
    errorMessage.value = '정확히 "회원 탈퇴 하겠습니다."를 입력해주세요.';
  } else {
    errorMessage.value = '';
    alert('회원 탈퇴가 완료되었습니다.');
  }
};

const handleEnter = (event) => {
  if (event.key === 'Enter') {
    checkInput();
  }
};
</script>

<template>
  <div class="back">
    <img src="@/assets/icons/logo.svg">
    <div class="white-box">
      <div class="title">회원탈퇴</div>
      <div class="form">
        <input type="text" v-model="userInput" placeholder="회원 탈퇴 하겠습니다.(따라서 작성하세요)" @keydown="handleEnter">
      </div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <input type="button" value="탈퇴하기" @click="checkInput">
    </div>
  </div>
</template>

<style scoped>
input::placeholder {
  text-align: center;
  color: var(--gray-font);
}
input[type="text"] {
  height: 70px;
  background-color: var(--gray-input);
  border: none;
  border-radius: 10px;
  width: 670px;
  padding: 0px 60px;
}
input[type="button"] {
  margin-top: 30px;
  border-radius: 52px;
  background-color: var(--basic-yellow);
  border: none;
  font-weight: 600;
  font-size: 18px;
  width: 30%;
  height: 44px;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.50));
}
.title {
  font-weight: 600;
  font-size: 25px;
  padding-bottom: 80px;
}
.white-box {
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
.error-message {
  color: var(--real-red);
  font-size: 16px;
  margin-top: 10px;
}
</style>
