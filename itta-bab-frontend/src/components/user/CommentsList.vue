<script setup>
import '@/assets/css/resetcss.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
</script>

<template>
  <div class="display">
    <div class="title">
      <font-awesome-icon :icon="['far', 'comment']" size="2x"/>
      <div>작성 댓글 목록</div>
    </div>
  </div>
  <div class="list-container">
    <div class="borderline"></div>
    <div class="list-content">
      <div class="contents">
        <div class="num">1</div>
        <div class="text">가나다가나다가나다가나다가나다가나다가나다가나다가나다가나다가나다가나다가나다가나다가나다가나다가나다가나다</div>
        <div class="delete">2024-09-24 11:59</div>
      </div>
    </div>
    <div class="list-content">
      <div class="contents">
        <div class="num">1</div>
        <div class="text">가나다</div>
        <div class="delete">2024-09-24 11:59</div>
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
.delete{
  color: var(--gray-font);
  font-size: 15px;
}
.contents{
  display: flex;
  justify-content: space-between;
  margin: 15px 30px;
}
.num{
  font-size: 20px;
  font-weight: 400;
}
.text{
  white-space: nowrap;        /* 한 줄로 표시되도록 */
  overflow: hidden;           /* 넘치는 텍스트는 숨김 처리 */
  text-overflow: ellipsis;
  width: 400px;
  font-size: 20px;
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