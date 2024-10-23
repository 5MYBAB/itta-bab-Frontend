<script setup>
</script>

<template>
  <div class="top-section">
    <img src="@/assets/icons/itta-bab_logo.svg" alt="어라라...?"/>
    <span>XXX 관리자님</span>
  </div>
</template>

<style scoped>
.top-section {
  margin-left: 5%;
  display: flex;
  flex-direction: row;
  align-items: center; /* 이미지와 텍스트를 세로 중앙 정렬 */
  justify-content: flex-start; /* 좌측 정렬 */
}

.top-section span {
  font-size: 40px;
  line-height: 100px; /* 필요에 따라 조정 */
  text-align: center;
  margin-left: 2%; /* 텍스트와 이미지 사이의 간격 설정 */
}
</style>
