<script setup>
import '@/assets/css/resetcss.css';
</script>

<template>
  <div class="flex-box">
    <div><img src="@/assets/icons/logo.svg"></div>
    <div class="title">한화 부트캠프</div>
  </div>
</template>

<style scoped>
.flex-box{
  display: flex;
  background-color: var(--background-color);
}
.flex-box div{
  margin: 25px;
}
.title{
  font-size: 30px;
  display: flex;
  align-items: center;
}

</style>