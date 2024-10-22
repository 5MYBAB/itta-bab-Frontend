<script setup>
import '@/assets/css/resetcss.css';
import LoginForm from "@/components/user/LoginForm.vue";
</script>

<template>
  <div class="back">
    <LoginForm/>
    <div class="notice">수료하고 계시는 부트 캠프가 없다면 ittababCompaby@ohmybab.com으로 연락 주세요.</div>
  </div>
</template>

<style scoped>
.back {
  padding-top: 30px;
  background-color: var(--background-color);
  display: flex;
  justify-content: center;
  align-items: center; /* 세로 가운데 정렬 */
  flex-direction: column;
}
.notice{
  display: flex;
  align-items: center; /* 세로 가운데 정렬 */
  margin-top: 30px;
  margin-bottom: 50px;
  color: var(--gray-font);
}
</style>
