<script setup>
import {computed, ref} from 'vue';
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

const passwordCheckMessage = ref('');

// 비밀번호 유효성 검사
const isValidPassword = computed(() => {
  if (password.value.length >= 8 && password.value.length <= 15 && password.value.match(/[A-Za-z]/) && password.value.match(/\d/)) {
    passwordCheckMessage.value = '사용할 수 있는 비밀번호입니다.';
    return true; // 유효한 비밀번호
  } else if (password.value.length === 0) {
    passwordCheckMessage.value = '영문, 숫자 포함하여 8~15자 입력해주세요 '; // 비밀번호가 비어있을 경우
    return false; // 비밀번호가 유효하지 않음
  } else {
    passwordCheckMessage.value = '영문, 숫자 포함하여 8~15자 입력해주세요 '; // 유효하지 않을 경우
    return false; // 비밀번호가 유효하지 않음
  }
});

const passwordMismatch = computed(() => {
  return password.value !== confirmPassword.value && confirmPassword.value.length > 0;
});

// 비밀번호 일치 여부
const passwordMatch = computed(() => {
  return password.value === confirmPassword.value && confirmPassword.value.length > 0;
});
</script>

<template>
  <div class="back">
    <img src="@/assets/icons/logo.svg">
    <div class="white-box">
      <div class="title">회원 정보 수정</div>
      <div class="form">
        <div class="inline">
          <div class="label">비밀번호</div>
          <div class="input-box">
            <input type="password" v-model="password" required @input="validatePassword">
            <div
                class="small"
                :class="{'valid': isValidPassword, 'invalid': !isValidPassword && password.length > 0}"
            >
              {{ passwordCheckMessage }}
            </div>
          </div>
        </div>
        <div class="inline">
          <div class="label">비밀번호 재확인</div>
          <div class="input-box">
            <input type="password" v-model="confirmPassword" :disabled="!password" required>
            <div v-if="passwordMismatch" class="error-message">비밀번호가 일치하지 않습니다.</div>
            <div v-if="passwordMatch" class="success-message">비밀번호가 일치합니다.</div>
          </div>
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

.small{
  font-size: 14px;
  font-weight: 500;
  color: var(--gray-font);
  padding-left: 20px;
  margin-top: 5px;
}

.success-message, .valid{
  color: var(--active-green);
  font-size: 14px;
  font-weight: 500;
  padding-left: 20px;
  margin-top: 5px;
}

.error-message, .invalid {
  color: var(--real-red);
  font-size: 14px;
  font-weight: 500;
  padding-left: 20px;
  margin-top: 5px;
}
</style>
