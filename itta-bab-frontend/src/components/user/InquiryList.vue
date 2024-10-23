<script setup>
import '@/assets/css/resetcss.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
</script>

<template>
  <div class="display">
    <div class="title">
      <font-awesome-icon :icon="['far', 'pen-to-square']" size="2x"/>
      <div>문의 목록</div>
    </div>
  </div>
  <div class="list-container">
    <div class="borderline"></div>
<!-- 문의ver -->
    <div class="list-content">
      <div class="inquiry-content inquiry-title">1</div>
      <div class="inquiry-content1">
        <div class="inquiry-title">문의 제목 합니당</div>
        <div class="inquiry-text">문의 합니당문의 합니당문의 합니당문의 합니당문의 합니당문의 합니당문의 합니당문의 합니당문의 합니당</div>
      </div>
      <div class="inquiry-content date">2024-10-11</div>
    </div>
    <div class="line"></div>
<!--  답변ver  -->
    <div class="list-content">
      <div class="inquiry-content inquiry-title">1</div>
      <div class="inquiry-content1">
        <div class="inquiry-title">문의 제목 합니당</div>
        <div class="inquiry-text">문의 합니당문의 </div>
      </div>
      <div class="inquiry-content date">2024-10-11</div>
    </div>
    <div class="yellow">
      <div class="box">
        <div><font-awesome-icon :icon="['fas', 'arrow-turn-up']" rotation=90 /></div>
        <div class="inquiry-answer">dfsdjfsildjfslijflsdfdfsdjfsildjfslijflsdf</div>
      </div>
    </div>
    <div class="line"></div>
  </div>


</template>

<style scoped>
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
.inquiry-answer{
  padding: 0px 20px;
  word-wrap: break-word;
  width: 90%;
}
.box{
  width: 70%;
  margin-left: 50px;
  background-color: var(--background-color);
  border-radius: 10px;
  padding: 30px 10px;
  display: flex;
}
.yellow{
  width:100%;
  display: flex;
  justify-content: center;
}
.inquiry-content1{
  width: 600px;
}
.inquiry-title{
  word-wrap: break-word;
  font-weight: 600;
  margin-bottom: 10px;
}
.date{
  font-size: 15px;
}
.inquiry-text{
  word-wrap: break-word;
}
.inquiry-content{
  margin: 0px 15px;
  word-wrap: break-word;
  padding-bottom: 10px;
}
.list-content{
  align-items: center;
  width: 80%;
  display: flex;
  justify-content: space-between;
  padding: 10px 0px;
}
.list-container{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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