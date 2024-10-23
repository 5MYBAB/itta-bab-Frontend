<script setup>
import '@/assets/css/resetcss.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
</script>

<template>
  <div class="display">
    <div class="title">
      <font-awesome-icon :icon="['fas', 'triangle-exclamation']" size="2x" />
      <div>신고 목록</div>
    </div>
  </div>
  <div class="list-container">
    <div class="borderline"></div>
    <div class="list-content">
      <div class="contents">
        <div class="text">1</div>
        <div class="text">가나다가나다</div>
        <div class="ctg">게시판</div>
      </div>
    </div>
    <div class="list-content">
      <div class="contents">
        <div class="text">1</div>
        <div class="text">가나다</div>
        <div class="ctg">댓글</div>
      </div>
    </div>

  </div>

</template>

<style scoped>
.borderline{
  background-color: var(--gray-font);
  height: 2px;
  width: 80%;
}
.ctg{
  font-size: 20px;
  font-weight: 600;
  border-radius: 20px;
  width: 87px;
  height: 42px;
  background-color: var(--active-green);
  display: flex;
  justify-content: center;
  align-items: center;
}
.contents{
  display: flex;
  justify-content: space-between;
  gap: 230px;
  margin: 15px 30px;
  align-items: center
}
.text{
  font-size: 20px;
  font-weight: 400;
}
.list-container{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.list-content{
  width: 80%;
  border-bottom: 1px var(--gray-font) solid;
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
</style>