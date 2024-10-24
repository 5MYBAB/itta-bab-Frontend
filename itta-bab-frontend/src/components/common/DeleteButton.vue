<!-- DeleteButton.vue -->
<script setup>
const deleteData = () => {
  alert("구현해야 합니다.");
}
</script>

<template>
  <button v-on:click="deleteData">
    <slot name="label"/> <!-- 'label' 슬롯을 사용하여 텍스트 표시 -->
  </button>
</template>

<style scoped>
/* 버튼 스타일을 추가할 수 있습니다 */
button {
  background-color: #ff4d4d; /* 버튼 배경색 */
  color: white; /* 버튼 텍스트 색상 */
  border: none; /* 테두리 제거 */
  padding: 10px 15px; /* 패딩 설정 */
  border-radius: 30px; /* 모서리 둥글게 */
  cursor: pointer; /* 커서 포인터로 변경 */
  width: 80px;
}
button:hover {
  background-color: #ff1a1a; /* 호버 시 배경색 변경 */
}
</style>
