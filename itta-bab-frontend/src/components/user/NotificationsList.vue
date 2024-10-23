<script setup>
import '@/assets/css/resetcss.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
</script>

<template>
  <div class="display">
    <div class="title">
      <font-awesome-icon :icon="['fas', 'bell']" size="2x"/>
      <div>알람 목록</div>
    </div>
  </div>
  <div class="list-container">
    <div class="borderline"></div>
    <div class="list-content">
      <div class="contents">
        <div class="ctg">
          <img src="@/assets/icons/alarm-group.svg">
          <div>모임&nbsp;<div id="red-dot"></div></div>
        </div>
        <div class="text">임광택임광택임광택임광택(pangtaek)님의 모임이 등록하였습니다</div>
        <div class="delete">2024-09-24 11:59</div>
      </div>
    </div>
    <div class="list-content">
      <div class="contents">
        <div class="ctg">
          <img src="@/assets/icons/alarm-post.svg">
          <div>익명 게시판&nbsp;<div id="red-dot"></div></div>
        </div>
        <div class="text">글이 등록되었습니다: 소통해요! </div>
        <div class="delete">2024-09-24 11:59</div>
      </div>
    </div>
    <div class="list-content">
      <div class="contents">
        <div class="ctg">
          <img src="@/assets/icons/alarm-review.svg">
          <div>리뷰</div>
        </div>
        <div class="text">리뷰가 등록되었습니다: 버거킹 신대방삼거리점</div>
        <div class="delete">2024-09-24 11:59</div>
      </div>
    </div>
  </div>

</template>

<style scoped>
#red-dot{
  width: 7px;
  height: 7px;
  background-color: var(--real-red);
  border-radius: 10px;
}
.ctg{
  display: flex;
  align-items: center;
}
.ctg img{
  margin-right: 20px;
}
.ctg div{
  width: 125px;
  font-weight: 600;
  font-size: 20px;
  display: flex;
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
  align-items: center;
}
.text{
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
  width: 400px;
  font-size: 15px;
  padding: 5px;
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