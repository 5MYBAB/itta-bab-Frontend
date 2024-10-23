<script setup>
import '@/assets/css/resetcss.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
</script>

<template>
  <div class="display">
    <div class="title">
      <font-awesome-icon :icon="['fas', 'list-ul']" size="2x" />
      <div>리뷰 목록</div>
    </div>
  </div>
  <div class="list-container">
    <div class="borderline"></div>
    <div class="list-content">
      <div class="contents">
        <div class="text">1</div>
        <div class="store-info">
          <div class="store-name">카츠디나인</div>
          <div class="text">가나다</div>
        </div>
        <div class="delete">2024-09-24 11:59</div>
      </div>
    </div>    <div class="list-content">
    <div class="contents">
      <div class="text">1</div>
      <div class="store-info">
        <div class="store-name">카츠디나인</div>
        <div class="text">가나다가나다가나다가나다가나다가나다가가나다가나다가나다가나다가나다나다</div>
      </div>
      <div class="delete">2024-09-24 11:59</div>
    </div>
  </div>    <div class="list-content">
    <div class="contents">
      <div class="text">1</div>
      <div class="store-info">
        <div class="store-name">카츠디나인</div>
        <div class="text">가가나다가나다가나다가나다가나다나다</div>
      </div>
      <div class="delete">2024-09-24 11:59</div>
    </div>
  </div>    <div class="list-content">
    <div class="contents">
      <div class="text">1</div>
      <div class="store-info">
        <div class="store-name">카츠디나인</div>
        <div class="text">가나가나다가나다가나다가나다다</div>
      </div>
      <div class="delete">2024-09-24 11:59</div>
    </div>
  </div>
  </div>

</template>

<style scoped>
.store-info{
  display: flex;
  justify-content: flex-start;
  width: 70%;
}
.store-name{
  font-size: 20px;
  font-weight: 600;
  margin-right: 60px;
  white-space: nowrap;
}
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
.text{
  font-size: 15px;
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