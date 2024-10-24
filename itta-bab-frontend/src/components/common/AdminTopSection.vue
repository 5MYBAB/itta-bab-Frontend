<script setup>

const cl = () => {
  alert("aa");
};

</script>

<template>
  <div class="container">
    <span class="icon" v-on:click="cl">
      <slot name="icon"/> <!-- 아이콘 슬롯 -->
    </span>
    <span class="label">
      <slot name="label"/> <!-- 텍스트 슬롯 -->
    </span>
  </div>
</template>

<style scoped>
.container {
  display: flex; /* Flexbox 사용 */
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: center; /* 수평 중앙 정렬 */
  height: 100%; /* 필요에 따라 높이 설정 */
  border-bottom: 1px solid #A3A3A3;
}

.icon {
  margin-right: 10px; /* 아이콘과 텍스트 간격 */
  font-size: 1.5em; /* 아이콘 크기 조정 (예: 1.5배) */
  margin-bottom: 1.9%;
}

.label {
  margin-bottom: 2%;
  font-size: 40px; /* 원하는 폰트 사이즈로 설정 */
  font-weight: bold;
}
</style>
