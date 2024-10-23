<script setup>
import '@/assets/css/resetcss.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
</script>

<template>
  <div class="display">
    <div class="title">
      <font-awesome-icon :icon="['far', 'clipboard']" size="2x"/>
      <div>작성글 목록</div>
    </div>
  </div>
  <div class="list-container">
    <div class="borderline"></div>
      <div class="inline">
        <div class="text">1</div>
        <div class="text">프론트엔드 고수 되는 법</div>
        <div class="date">2024-10-11 12:00</div>
      </div>
    <div class="line"></div>
    <div class="inline">
      <div class="text">1</div>
      <div class="text">프론트엔드 고수 되는 법프론트엔드 고수 되는 법</div>
      <div class="date">2024-10-11 12:00</div>
    </div>
    <div class="line"></div>      <div class="inline">
    <div class="text">1</div>
    <div class="text">프론트엔드 고수 되는 법</div>
    <div class="date">2024-10-11 12:00</div>
  </div>
    <div class="line"></div>
  </div>
</template>

<style scoped>
.inline{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 75%;
}
.text{
  font-size: 20px;
  font-weight: 600;
}
.date{
  font-weight: 400;
  font-size: 15px;
}
.display{
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
.title{
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}
.title div{
  font-size: 30px;
  font-weight: 600;
  margin-left: 10px;
}
.borderline{
  margin:  10px 0px;
  background-color: var(--gray-font);
  height: 2px;
  width: 80%;
}
.line{
  margin:  10px 0px;
  background-color: var(--gray-font);
  height: 1px;
  width: 80%;
}
.list-container{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>