<script setup>
import {ref} from 'vue';
import '@/assets/css/resetcss.css';

const categoryName = ref('');
const confirmPassword = ref('');

const errorMessage = ref('');

const checkDuplication = () => {
  alert("구현해야합니다.");
};

</script>

<template>
  <div class="back">
    <img src="@/assets/icons/logo.svg">
    <div class="white-box">
      <div class="title">메뉴카테고리 등록</div>
      <div class="form">
        <div class="inline">
          <div class="label">카테고리 이름</div>
          <div>
            <input type="text" v-model="categoryName">
            <div class="notice">영문, 숫자 포함하여 255까지 입력가능합니다.</div>
          </div>
        </div>
      </div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <input type="button" value="등록하기" @click="checkDuplication">
    </div>
  </div>
</template>

<style scoped>
.label {
  font-size: 17px;
  font-weight: 600;
  margin-right: 70px;
}

input[type="text"] {
  width: 328px;
  height: 44px;
  border-radius: 10px;
  border: none;
  background-color: var(--gray-input);
}

.notice {
  font-size: 14px;
  color: var(--gray-font);
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

.inline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0px;
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
